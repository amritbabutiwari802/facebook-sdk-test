import React, { Component } from 'react';

import './App.css';
import FacebookProvider, { Login } from 'react-facebook-sdk';

class App extends Component {
  handleResponse = (data) => {
    console.log(data);
    window.FB.api(
      `/${data.tokenDetail.userID}/permissions`,
      "GET",
      function (permissionResponse) {
        console.log("granted permission", permissionResponse);
        window.FB.api(
          `/${data.tokenDetail.userID}/accounts?fields=name&access_token=${data.tokenDetail.accessToken}`,
          "GET",
          async function (assigendPages) {
            const allPages = assigendPages.data;
            console.log(assigendPages);
          }
        );
      }
    );
  }
 
  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <FacebookProvider appId="343921607951637">
        <Login
          scope="public_profile,email,pages_messaging,pages_read_engagement,pages_show_list,pages_manage_metadata"
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
