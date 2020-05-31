import { connect } from 'react-redux';

import DashboardView from './view';


function stp(s) {
  return {
    control: s.panel.control,
  }
}

function dtp(d) {
  return {}
}


const Dashboard = connect(
  stp,
  dtp,
)(DashboardView);

export default Dashboard;
