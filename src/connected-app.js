import { connect } from 'react-redux';

import App from './app';

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ConnectedApp;
