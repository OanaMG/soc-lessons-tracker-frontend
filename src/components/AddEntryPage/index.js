import React, { useEffect } from "react";
import css from "./addEntryPage.module.css";
import {
  Heading,
  HStack,
  VStack,
  Input,
  Stack,
  ListItem,
  UnorderedList,
  SimpleGrid,
} from "@chakra-ui/react";
import UserProfile from "../UserProfile";
import EntryForm from "../EntryForm";
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";

function AddEntryPage() {
  const { user } = useAuth0();

  useEffect(() => {
    async function getEntries() {
      let response = await fetch(`${BACKEND_URL_DAILY_ENTRIES}`);
      let data = await response.json();
      console.log(data);
    }
    getEntries();
  }, []);

  const formatDate = (date) => {
    if (date !== undefined) {
      var stringDate = date.toString(); //eg Fri Apr 02 2021 00:00:00 GMT+0100 (British Summer Time)
      var yearString = stringDate.slice(11, 15); //year string eg 2021
      var monthString = stringDate.slice(4, 7); //month string eg Jan
      var dayString = stringDate.slice(8, 10); //day string eg 14

      switch (monthString) {
        case "Jan":
          monthString = "01";
          break;
        case "Feb":
          monthString = "02";
          break;
        case "Mar":
          monthString = "03";
          break;
        case "Apr":
          monthString = "04";
          break;
        case "May":
          monthString = "05";
          break;
        case "Jun":
          monthString = "06";
          break;
        case "Jul":
          monthString = "07";
          break;
        case "Aug":
          monthString = "08";
          break;
        case "Sep":
          monthString = "09";
          break;
        case "Oct":
          monthString = "10";
          break;
        case "Nov":
          monthString = "11";
          break;
        default:
          monthString = "12";
      }

      var fullDate = dayString.concat(`-${monthString}-${yearString}`); //concatenated date format DD/MM/YYYY
      //console.log(fullDate);
      return fullDate;
    }
  };

  const postBooking = (formData, token) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Date: formatDate(formData.date),
        Topics: formData.topics,
        NotionLinks: formData.linkNotion,
        AdditionalResourcesLinks: formData.linkUsefulResources, //parseInt(formData.number)
        AdditionalNotes: formData.additionalNotes,
        RecapQuizScore: formData.score,
        Token: token,
      }),
    };
    fetch(`${BACKEND_URL_DAILY_ENTRIES}`, requestOptions);
  };

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
        >
          <EntryForm postBooking={postBooking} token={user.sub} />
        </HStack>
      </Stack>
    </div>
  );
}

export default AddEntryPage;
