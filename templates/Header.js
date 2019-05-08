module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
class Header extends Component {
  render(){
    return(
      <div>
        Header
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  };
};

export default export default connect(mapStateToProps, {...actions})(Header);
`
