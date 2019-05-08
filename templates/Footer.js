module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
class Footer extends Component {
  render(){
    return(
      <div>
        Footer
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, {...actions})(Footer);
`
