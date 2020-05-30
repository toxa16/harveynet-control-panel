import { connect } from 'react-redux';

import SatMapView from './view';


function stp(s) {
  return {}
}

function dtp(d) {
  return {}
}


const SatMap = connect(
  stp,
  dtp,
)(SatMapView);

export default SatMap;
