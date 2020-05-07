import { connect } from 'react-redux';

import NavbarView from './view';


function stp(s) {
  return {
    accessToken: s.auth.accessToken,
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
