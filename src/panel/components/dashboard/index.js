import { connect } from 'react-redux';

import DashboardView from './view';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {
    control: s.panel.control.machineId,
  }
}

function dtp(d) {
  return {
    onSelectClick: () => d({ type: ControlAction.SELECT_CLICK }),
    onStartClick: () => d({ type: ControlAction.START_CLICK }),
  }
}


const Dashboard = connect(
  stp,
  dtp,
)(DashboardView);

export default Dashboard;
