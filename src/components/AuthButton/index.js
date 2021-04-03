import React from 'react';
import { useAuthContext } from '../../authContext';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import UserProfile from '../UserProfile';


function AuthButton() {
    const [isAuthenticated] = useAuthContext();
  
    if (isAuthenticated) {
      return (
        <div>
          <LogoutButton />
          <UserProfile />
        </div>
      );
    }
    return (
      <div>
        <LoginButton />
      </div>
    );
  }
  
  export default AuthButton;
