import { connect } from 'react-redux';

import ButtonsGridView from './view';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    onMoveCommand: command => {},
  };
}


const ButtonsGrid = connect(
  stp,
  dtp,
)(ButtonsGridView);

export default ButtonsGrid;
