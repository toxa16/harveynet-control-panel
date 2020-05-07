import { connect } from 'react-redux';

import ImplicitPanelView from './view';


function stp(s) {
  return {
    accessToken: s.auth.accessToken,
  };
}

function dtp(d) {
  return {};
}


const ImplicitPanel = connect(
  stp,
  dtp,
)(ImplicitPanelView);

export default ImplicitPanel;
