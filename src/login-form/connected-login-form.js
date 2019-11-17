import { connect } from 'react-redux';

import LoginForm from './login-form';
import ActionType from '../action-type.enum';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: e => dispatch({
      type: ActionType.LOGIN_REQUEST,
      payload: {
        username: e.target.username.value,
      }
    }),
  };
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default ConnectedLoginForm;
