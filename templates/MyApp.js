module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import actions from '../actions';
import imageUrl from '../images/smiley.gif';

const Title = styled.h3\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;
const DescriptionPara = styled.p\`
  text-align: center;
  font-size: 1em;
\`;
const Wrapper = styled.section\`
  padding: 0em;
  background: papayawhip;
\`;
const AppWrapper = styled.div\`
  background-image: url(\${imageUrl});
  background-repeat:no-repeat;
  width:48px;
  height:48px;
  padding-left: 20px;
\`;

class MyApp extends Component {
  render(){
    return(
      <AppWrapper>
        <Title>
          Start your next react project in seconds by using react-redux-scss-setup
        </Title>
        <div>
          <Title>
            Try Me ...
          </Title>
        </div>
        <DescriptionPara>
          <Link to={'https://github.com/hnagarkoti/react-redux-biolerplate'}>Click to view Github repositry</Link>
        </DescriptionPara>
      </AppWrapper>
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
