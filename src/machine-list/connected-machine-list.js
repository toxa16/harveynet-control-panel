import { connect } from 'react-redux';

import MachineList from './machine-list';

function mapsStateToProps(state) {
  return {};
}

function maspDispatchToProps(dispatch) {
  return {};
}

const ConnectedMachineList = connect(
  mapsStateToProps,
  maspDispatchToProps,
)(MachineList);

export default ConnectedMachineList;
