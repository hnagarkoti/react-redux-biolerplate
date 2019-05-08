module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
class MyApp extends Component {
  render(){
    return(
      <div>
        My App Loaded using biolerplate
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, {...actions})(MyApp);
`
