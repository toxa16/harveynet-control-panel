import { connect } from 'react-redux';

import LoginView from './view';


function stp(s) {
  return {};
}

function dtp(d) {
  return {};
}


const Login = connect(
  stp,
  dtp,
)(LoginView);

export default Login;
