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
const CopyRight = styled.p\`
  font-size: medium;
  background-color: yellowgreen
\`;
class Footer extends Component {
  render(){
    const date1 = new Date('05/07/2019');
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return(
      <Wrapper>
        <Title>
          Footer Section
        </Title>
        <CopyRight>
          {\`Created By Hemant Nagarkoti \${diffDays} days back\`}
        </CopyRight>
      </Wrapper>
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
