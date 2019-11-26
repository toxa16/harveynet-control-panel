import { connect } from 'react-redux';

import MachineList from './machine-list';
import ActionType from '../action-type.enum';

function mapsStateToProps(state) {
  return {
    machines: state.machines,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMachineSelect: machine => {
      /*dispatch({
        type: ActionType.MACHINE_SELECT,
        payload: { machine },
      });*/
    },
  };
}

const ConnectedMachineList = connect(
  mapsStateToProps,
  mapDispatchToProps,
)(MachineList);

export default ConnectedMachineList;
