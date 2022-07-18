import React, { Component } from 'react';

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
      <FacebookProvider appId="343921607951637">
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
