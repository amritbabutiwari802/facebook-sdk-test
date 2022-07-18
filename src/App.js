import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookProvider, { Login } from 'react-facebook-sdk';

class App extends Component {
  handleResponse = (data) => {
    console.log(data);
  }
 
  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <FacebookProvider appId="1506582276387543">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </Login>
      </FacebookProvider>
    );
  
  }
}

export default App;
