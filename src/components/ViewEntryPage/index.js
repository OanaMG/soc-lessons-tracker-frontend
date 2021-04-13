import css from "./viewEntryPage.module.css";
import {Heading,HStack, VStack, Input, Stack, Grid, GridItem, Button, Box} from '@chakra-ui/react';
import UserProfile from "../UserProfile";
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import ViewEntryColumnDisplay from '../ViewEntryColumnDisplay';

function ViewEntryPage() {
  const { user } = useAuth0();
  const [entryDate, setEntryDate] = useState("");
  
  //!! Change to use reducer
  const [topics, setTopics] = useState("TBA");
  const [recapQuizScore, setRecapQuizScore] = useState("TBA");
  const [notionLinks, setNotionLinks] = useState("TBA");
  const [githubLinks, setGithubLinks] = useState("TBA");
  const [additionalResourcesLinks, setAdditionalResourcesLinks] = useState("TBA");
  const [additionalNotes, setAdditionalNotes] = useState("TBA");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  async function getEntryByDate() {
    if (entryDate !== undefined) {
      let response = await fetch(
        `${BACKEND_URL_DAILY_ENTRIES}?token=${user.sub.slice(
          6,
          user.sub.length
        )}&date=${formatDate(entryDate)}`
      );
      let data = await response.json();
      console.log(data);

      if (data[0] !== undefined) {
        console.log(data[0].uploadedDocuments[0]);

        setTopics(data[0].topics); //!! to change to useReducer
        setRecapQuizScore(data[0].recapQuizScore);
        setNotionLinks(data[0].notionLinks);
        setGithubLinks(data[0].githubLinks);
        setAdditionalResourcesLinks(data[0].additionalResourcesLinks);
        setAdditionalNotes(data[0].additionalNotes);
        setUploadedDocuments(data[0].uploadedDocuments);
      }
    }
  }
  function handleClick() {
    if (entryDate !== null && entryDate !== "") {
      getEntryByDate();
      console.log("date selected " + formatDate(entryDate));
    } else {
      console.log("no date added");
    }
  }

  const formatDate = (date) => {
    if ((date !== undefined) & (date !== null)) {
      return date
        .slice(8, 10)
        .concat(`-${date.slice(5, 7)}-${date.slice(0, 4)}`);
    }
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
          width="100%"
        >
          <VStack width="100%" spacing="2%">
            <Heading size="lg">View Daily Entry</Heading>

            <VStack alignSelf="flex-start" alignItems="flex-start">
              <Heading size="md">
                To begin, select the day for which you would like to see the
                entry and then press Show Entry:
              </Heading>
              <HStack>
                <Input
                  name="date"
                  type="date"
                  width="min-content"
                  onChange={(event) => setEntryDate(event.target.value)}
                />
                <Button
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                >
                  Show Entry
                </Button>
              </HStack>

              <Grid templateColumns="repeat(7, 1fr)" gap={3}>
                <ViewEntryColumnDisplay
                  keyText="Recap Quiz Score"
                  valueText={recapQuizScore}
                />
                <ViewEntryColumnDisplay
                  keyText="Topics Covered"
                  valueText={topics}
                />
                <ViewEntryColumnDisplay
                  keyText="Link(s) to Notion Notes (or similar):"
                  valueText={notionLinks}
                />
                <ViewEntryColumnDisplay
                  keyText="Link(s) to GitHub Repositories"
                  valueText={githubLinks}
                />
                <ViewEntryColumnDisplay
                  keyText="Useful Resources Link(s)"
                  valueText={additionalResourcesLinks}
                />
                <ViewEntryColumnDisplay
                  keyText="Additional Notes:"
                  valueText={additionalNotes}
                />
                <GridItem colSpan={3}>
                  <Heading size="md">Uploaded Documents</Heading>
                </GridItem>
                <GridItem colSpan={4}>
                {uploadedDocuments.map((doc) => {
                  return (
                    <Box color="blue.500" size="sm">
                      <Heading size="sm">{(doc.slice((doc.lastIndexOf('/')+1), doc.length))}</Heading>
                      <a href={doc} download>
                        Click here to open the file
                      </a>
                    </Box>
                  );
                })}
                </GridItem>
              </Grid>
            </VStack>
          </VStack>
        </HStack>
      </Stack>
    </div>
  );
}

export default ViewEntryPage;
