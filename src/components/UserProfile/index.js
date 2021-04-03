import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if(isAuthenticated){
    console.log(user.sub);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <p>Name: {user.nickname}</p>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};

export default UserProfile;