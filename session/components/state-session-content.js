import { connect } from 'react-redux';

import SessionContent from './session-content';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const StateSessionContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionContent);

export default StateSessionContent;
