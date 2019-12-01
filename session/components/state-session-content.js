import { connect } from 'react-redux';

import SessionContent from './session-content';

function mapStateToProps(state) {
  return {
    isWebSocketOpen: state.isWebSocketOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const StateSessionContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionContent);

export default StateSessionContent;
