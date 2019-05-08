module.exports = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyApp from '../components/MyApp';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <MyApp />
        </div>
        <div className="App-footer">
          <Footer />
        </div>
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
