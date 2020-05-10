import { connect } from 'react-redux';

import ImplicitPanelView from './view';


function stp(s) {
  return {
    authenticated: s.auth.authenticated,
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
