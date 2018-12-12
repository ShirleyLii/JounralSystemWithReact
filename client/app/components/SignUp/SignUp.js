import React, { Component } from 'react';
import 'whatwg-fetch';

import { Link } from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   isLoading: true,
      token: '', //if theres a token, which means the user is signed in 
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      
    };
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    })
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    })
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    })
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    })
  }

  onSignUp() {
    //grab state]
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    // this.setState({
    //   isLoading: true,
    // })
    // post requst to backend 

    fetch('/api/account/signup', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName : signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then(res => res.json())
      .then(json =>{
        if(json.success){
          this.setState({
            signUpError: json.message,
            // isLoading: false,
            signUpEmail: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpPassword: '',
          });
        }
        else{
          this.setState({
            signUpError: json.message,
            // isLoading: false,
          });
        }
      });

  }


  render() {
    const {
      isLoading,
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpError,

    } = this.state;

    // if (isLoading) {
    //   return (<div><p>Loading...</p></div>)
    // }


      return (
        <div>

          <div id = "signup">
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }

            <p>Sign Up</p>
            <input type="text" placeholder="First Name" value={signUpFirstName} onChange={this.onTextboxChangeSignUpFirstName} /><br />
            <input type="text" placeholder="Last Name" value={signUpLastName} onChange={this.onTextboxChangeSignUpLastName} /><br />
            <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
            
          </div>

      {/* <div>
        <p>Signed Up succeeded!</p>

        <Link to="/">Go home</Link>
      </div> */}

        </div>
        
    
    )

  }
}

export default SignUp;