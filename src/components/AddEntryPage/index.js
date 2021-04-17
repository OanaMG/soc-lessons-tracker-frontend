import React from "react";
import css from "./addEntryPage.module.css";
import {Heading, HStack, VStack, Stack,} from "@chakra-ui/react";
import UserProfile from "../UserProfile";
import EntryForm from "../EntryForm";
import { useAuth0 } from "@auth0/auth0-react";

function AddEntryPage2() {
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
            <Heading size="lg">Add Daily Entry</Heading>
            <EntryForm token={((user.sub).slice(6,(user.sub).length))} />
          </VStack>
        </HStack>
      </Stack>
    </div>
  );
}

export default AddEntryPage2;
