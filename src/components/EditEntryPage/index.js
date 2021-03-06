import React from 'react';
import css from './editEntryPage.module.css';
import {Heading, HStack, VStack, Stack,} from '@chakra-ui/react';
import UserProfile from '../UserProfile';
import EditForm from '../EditForm';
import { useAuth0 } from "@auth0/auth0-react";

function EditEntryPage() {
  const { user } = useAuth0();

  return (
    <div className={css.bg}>
      <Stack
        bgColor="white"
        color="black"
        minHeight="100vh"
        minWidth="100vw"
        maxWidth="100%"
        display="flex"
        flexWrap="flex"
        paddingRight="2%"
        paddingLeft="2%"
      >
        <HStack
          alignItems="flex-start"
          justifyContent="space-between"
          paddingBottom="3%"
        >
          <VStack spacing="0%" alignItems="left" display="flex">
            <Heading size="2xl">SoC Lessons Tracker</Heading>
            <Heading size="lg">
              Keep track of all your School of Code lectures in one place
            </Heading>
          </VStack>

          <VStack>
            <UserProfile />
          </VStack>
        </HStack>

        <HStack
          alignItems="flex-start"
          justifyContent="space-around"
          display="flex"
          flexFlow="column-wrap"
          width="100%"
        >
          <VStack width="100%">
            <Heading size="lg">Edit Daily Entry</Heading>
            <EditForm token={((user.sub).slice(6,(user.sub).length))} />
          </VStack>
        </HStack>
      </Stack>
    </div>
  );
}
export default EditEntryPage;
