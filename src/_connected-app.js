import { connect } from 'react-redux';

import App from './app1';

function mapStateToProps(state) {
  return {
    username: state.username,
    currentMachine: state.currentMachine,
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
