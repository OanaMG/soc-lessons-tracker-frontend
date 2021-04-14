import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
//import UserProfile from '../UserProfile';
//import SignupButton from '../SignupButton';


function AuthenticationButton() {
    const {isAuthenticated} = useAuth0();
  
    if (isAuthenticated) {
      return (
        <div>
          <LogoutButton />
          {/* <UserProfile /> */}
        </div>
      );
    }
    return (
      <div>
        {/* <SignupButton /> */}
        <LoginButton textDisplay="Login"/>
      </div>
    );
  }
  
  export default AuthenticationButton;
