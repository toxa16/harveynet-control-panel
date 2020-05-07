import { connect } from 'react-redux';

import LoginView from './view';
import AuthAction from '../redux/action-type';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    onLogin: accessToken => d({
      type: AuthAction.AUTHENTICATE,
      payload: { accessToken },
    }),
  };
}


const Login = connect(
  stp,
  dtp,
)(LoginView);

export default Login;
