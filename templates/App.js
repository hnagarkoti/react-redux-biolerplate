module.exports = `
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyApp from '../components/MyApp';
import { createPortal } from 'react-dom'
class App extends Component {
  constructor(props) {
    super(props)
    //  Please remove these codes and uncomment the commented lines
    this.setContentRef = node =>
      (this.contentRef =
        ((!node || !node.contentWindow) && null) ||
        node.contentWindow.document.body)
  }
  render() {
    const { children, ...props } = this.props
    return (
      <div className="App" style={{ 'height': '1200px'}}>
        {/* <div className="App-header" style={{width: '100%'}}>
          <Header />
        </div>
        <div className="App-intro" style={{ width: '100%' }}>
          <MyApp />
        </div>
        <div className="App-footer" style={{ width: '100%' }}>
          <Footer />
        </div> */}
        <iframe {...props} src="https://hnagarkoti.bitbucket.io/" ref={this.setContentRef} style={{ 'height': '100%', 'width': '100%', }} frameBorder="0" allowFullScreen>
          {this.contentRef &&
            createPortal(
              React.Children.only(children),
              this.contentRef
            )}
        </iframe>
      </div>
    );
  }
}

export default connect(
  state=>({
}),
  {}
)(App)

`
