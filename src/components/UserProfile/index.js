import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { HStack, Text, VStack} from "@chakra-ui/react"


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
      <VStack display="flex" alignItems="left" spacing="0%">
        <HStack>
          <Text fontWeight="bold">Signed in as: </Text>
          <Text>{user.nickname}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Email: </Text>
          <Text>{user.email}</Text>
        </HStack>
      </VStack>
    )
  );
};

export default UserProfile;