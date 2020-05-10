import { connect } from 'react-redux';

import Navbar from './navbar';
import ActionType from '../_action-type.enum';

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch({ type: ActionType.LOGOUT_REQUEST }),
  };
}

const ConnectedNavbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

export default ConnectedNavbar;
