import { connect } from 'react-redux';

//import ButtonsGridView from './view';
import ButtonsGridView from './view-stream';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    onMoveCommand: command => d({
      type: `panel__move-command_${command.machineId}`,
      payload: command,
    }),
    onMoveCommandStart: command => d({
      type: ControlAction.MOVE_COMMAND_START,
      payload: command,
    }),
    onMoveCommandStop: () => d({
      type: ControlAction.MOVE_COMMAND_STOP,
    }),
  };
}


const ButtonsGrid = connect(
  stp,
  dtp,
)(ButtonsGridView);

export default ButtonsGrid;
