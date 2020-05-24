import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Pusher from 'pusher-js';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


// pusher message unchunking
function bindWithChunking(channel, event, callback) {
  channel.bind(event, callback); // Allow normal unchunked events.

  // Now the chunked variation. Allows arbitrarily long messages.
  var events = {};
  channel.bind(event + '-chunked', data => {
    if (!events.hasOwnProperty(data.id)) {
      events[data.id] = { chunks: [], receivedFinal: false };
    }
    var ev = events[data.id];
    ev.chunks[data.index] = data.chunk;
    if (data.final) ev.receivedFinal = true;
    if (ev.receivedFinal && ev.chunks.length === Object.keys(ev.chunks).length) {
      callback(JSON.parse(ev.chunks.join("")));
      delete events[data.id];
    }
  });
}


function createSagaChannel(machineId, pusherChannel) {
  return eventChannel(emit => {
    // checking whether the machine is already online
    pusherChannel.bind('pusher:subscription_succeeded', () => {
      const alreadyConnectedMachine = pusherChannel.members.get(machineId);
      if (alreadyConnectedMachine) {
        emit({
          type: PanelAction.SET_ONLINE,
          payload: { machineId },
        });
      }
    });
    // subscribing on machine connecting
    pusherChannel.bind('pusher:member_added', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_ONLINE,
          payload: { machineId },
        });
      }
    });
    // subscribing on machine disconnecting
    pusherChannel.bind('pusher:member_removed', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_OFFLINE,
          payload: { machineId },
        });
      }
    });
    // set coordinates
    pusherChannel.bind('client-set-coordinates', function(msg) {
      const { x, y } = msg;
      emit({
        type: PanelAction.SET_COORDINATES,
        payload: { machineId, x, y },
      });
    });
    // set camera image
    bindWithChunking(pusherChannel, 'client-set-camera-image', function(msg) {
      const { image } = msg;
      emit({
        type: PanelAction.SET_CAMERA_IMAGE,
        payload: { machineId, image },
      });
    })

    // unsubscribe
    return () => {};
  });
}

function* sagaChannelListener(sagaChannel) {
  while (true) {
    const action = yield take(sagaChannel);
    yield put(action);
  }
}

function createSagaControlChannel(controlChannel, machineId) {
  return eventChannel(emit => {
    controlChannel.bind('pusher:subscription_succeeded', () => {
      emit({
        type: PanelAction.ENABLE_CONTROL,
        payload: { machineId, enabled: true },
      });
    });
    controlChannel.bind('pusher:subscription_error', () => {
      emit({
        type: PanelAction.ENABLE_CONTROL,
        payload: { machineId, enabled: false },
      });
    });
    // unsubscribe
    return () => {};
  });
}

function* moveCommandListener(machineId, controlChannel) {
  while (true) {
    const action = yield take(`panel__move-command_${machineId}`);
    const command = action.payload;
    controlChannel.trigger('client-move-command', command);
  }
}

function* machineSaga(machine, pusher) {
  const { machineId } = machine;
  const pusherChannel = pusher.subscribe(`presence-${machineId}`);
  const sagaChannel = yield call(createSagaChannel, machineId, pusherChannel);
  yield fork(sagaChannelListener, sagaChannel);

  // control channel
  // TODO: connect only from machine control dashboard
  const controlChannel = pusher.subscribe(`presence-control-${machineId}`);
  const sagaControlChannel = yield call(createSagaControlChannel, controlChannel, machineId);
  yield fork(sagaChannelListener, sagaControlChannel);
  yield fork(moveCommandListener, machineId, controlChannel);
}


export default function* panelSaga(accessToken) {
  if (process.env.NODE_ENV === 'development') {
    Pusher.logToConsole = true;
  }
  const pusher = new Pusher(appKey, {
    cluster,
    authEndpoint,
    auth: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  try {
    const machines = yield call(getUserMachines, accessToken);
    yield put({
      type: PanelAction.SET_MACHINES,
      payload: { machines },
    });
    for (const machine of machines) {
      yield fork(machineSaga, machine, pusher);
    }
  } catch(err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
    yield put({
      type: PanelAction.MACHINES_ERROR,
      error: err,
    });
  }
}
