import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import PanelAction from './action-type';
import controlSaga from './control-saga';


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
    // set navsat
    pusherChannel.bind('client-set-navsat', function(msg) {
      const { latitude, longitude } = msg;
      emit({
        type: PanelAction.SET_NAVSAT,
        payload: { machineId, latitude, longitude },
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


export default function* machineSaga(machine, pusher) {
  const { machineId } = machine;
  const pusherChannel = pusher.subscribe(`presence-${machineId}`);
  const sagaChannel = yield call(createSagaChannel, machineId, pusherChannel);
  yield fork(sagaChannelListener, sagaChannel);

  // control channel
  // TODO: connect only from machine control dashboard
  yield fork(controlSaga, pusher, machineId);
}
