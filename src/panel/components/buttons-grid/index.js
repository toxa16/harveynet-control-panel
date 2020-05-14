import { connect } from 'react-redux';

import ButtonsGridView from './view';
import PanelAction from '../../redux/action-type';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    onMoveCommand: command => d({
      type: `panel__move-command_${command.machineId}`,
      payload: command,
    }),
  };
}


const ButtonsGrid = connect(
  stp,
  dtp,
)(ButtonsGridView);

export default ButtonsGrid;
