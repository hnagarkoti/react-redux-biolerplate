module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import actions from '../actions';
const Title = styled.h1\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;
const Wrapper = styled.section\`
  padding: 0em;
  background: papayawhip;
\`;
class Header extends Component {
  render(){
    return(
      <Wrapper>
        <Title>
          Header Section
        </Title>
      </Wrapper>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, {...actions})(Header);
`
