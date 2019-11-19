import { connect } from 'react-redux';

import MachineControl from './machine-control';
import ActionType from '../action-type.enum';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onExit: () => dispatch({ type: ActionType.MACHINE_CONTROL_EXIT }),
  };
}

const ConnectedMachineControl = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineControl);

export default ConnectedMachineControl;
