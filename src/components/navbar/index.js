import { connect } from 'react-redux';

import NavbarView from './view';


function stp(s) {
  return {
    authenticated: s.auth.authenticated,
  };
}

function dtp(d) {
  return {};
}


const Navbar = connect(
  stp,
  dtp,
)(NavbarView);

export default Navbar;
