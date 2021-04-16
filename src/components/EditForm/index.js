import React, { useState, useEffect, useRef } from "react";
import S3 from "react-aws-s3";
import {
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Box,
  Heading,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { BACKEND_URL_DAILY_ENTRIES, AWS_S3_CONFIG } from "../../libs/config";
import { FaCloudUploadAlt } from "react-icons/fa";
import FormAlertBox from "../FormAlertBox";
import Editable from "../Editable";

function EditForm({ token }) {
  const fileInput = React.useRef();
  const [uploadedFilesPath, setUploadedFilesPath] = useState([]);
  var locations = [];

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isSuccessfulOpen, setIsSuccessfulOpen] = useState(false);
  const onClose = () => {
    setIsSuccessfulOpen(false);
    setIsErrorOpen(false);
  };
  const cancelRef = React.useRef();

  // const { user } = useAuth0();
  const [entryDate, setEntryDate] = useState("");

  console.log(entryDate);

  //!! Change to use reducer
  const [id, setId] = useState("");
  const [topics, setTopics] = useState("TBA");
  const [recapQuizScore, setRecapQuizScore] = useState("TBA");
  const [notionLinks, setNotionLinks] = useState("TBA");
  const [githubLinks, setGithubLinks] = useState("TBA");
  const [additionalResourcesLinks, setAdditionalResourcesLinks] = useState(
    "TBA"
  );
  const [additionalNotes, setAdditionalNotes] = useState("TBA");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  async function getEntryByDate() {
    if (entryDate !== undefined) {
      let response = await fetch(
        `${BACKEND_URL_DAILY_ENTRIES}?token=${token}&date=${entryDate}`
      );
      let data = await response.json();
      console.log(data);

      if (data[0] !== undefined) {
        //console.log(data[0].uploadedDocuments[0]);
        setTopics(data[0].topics); //!! to change to useReducer
        setRecapQuizScore(data[0].recapQuizScore);
        setNotionLinks(data[0].notionLinks);
        setGithubLinks(data[0].githubLinks);
        setAdditionalResourcesLinks(data[0].additionalResourcesLinks);
        setAdditionalNotes(data[0].additionalNotes);
        setUploadedDocuments(data[0].uploadedDocuments);
        setId(data[0].id);
      }
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(AWS_S3_CONFIG);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      if (data.status === 204) {
        console.log("success");
        locations.push(data.location);
        setUploadedFilesPath(locations);
      } else {
        console.log("fail");
      }
    });
  };


  const handleS3Delete = (filename) => {
    const ReactS3Client = new S3(AWS_S3_CONFIG);
    ReactS3Client.deleteFile(filename)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleDeleteFile = (fileUrl, index) => {
    console.log("delete button clicked");
    console.log(fileUrl);
    console.log(index);
    console.log(fileUrl.slice(fileUrl.lastIndexOf("/") + 1, fileUrl.length));
    setUploadedDocuments([...uploadedDocuments.slice(0,index), ...uploadedDocuments.slice(index+1)]);
    handleS3Delete(fileUrl.slice(fileUrl.lastIndexOf("/") + 1, fileUrl.length));    //make it that if this is successful only then to we remove the path from uploaded documents. 
  }
  console.log(uploadedDocuments);

  const updateEntry = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id: id,
        Date: entryDate,
        Topics: topics,
        NotionLinks: notionLinks,
        AdditionalResourcesLinks: additionalResourcesLinks,
        GithubLinks: githubLinks,
        AdditionalNotes: additionalNotes,
        RecapQuizScore: recapQuizScore,
        Token: token,
        UploadedDocuments: uploadedFilesPath,
      }),
    };

    fetch(`${BACKEND_URL_DAILY_ENTRIES}/${id}`, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Something went wrong.");
      })
      .then(function (text) {
        console.log("Request successful", text);
        setIsSuccessfulOpen(true);
      })
      .catch(function (error) {
        console.log("Request failed", error);
        setIsErrorOpen(true);
      });

  }


  function SelectEditableEntry() {
    if (entryDate !== null && entryDate !== "") {
      setIsDisabled(false);
      getEntryByDate();
      console.log("date selected " + entryDate);
    } else {
      console.log("no date added");
    }
  }

  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Box width="100%">
      <VStack spacing="3%" alignItems="flex-start">
        <VStack alignItems="flex-start">
          <Heading size="md">
            Select the day for which you would like to edit your entry:
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
              onClick={SelectEditableEntry}
            >
              Start Editing
            </Button>
          </HStack>
        </VStack>

        <VStack alignItems="flex-start">
          <Heading size="md">Please edit the fields below as required:</Heading>

          <FormLabel>Daily Quiz Score</FormLabel>
          <Editable
            text={recapQuizScore}
            placeholder="Enter the test score"
            type="input"
            childRef={inputRef}
            inputWidth="24"
          >
            <Input
              type="number"
              name="recapQuizScore"
              min={0}
              max={10}
              placeholder={recapQuizScore}
              value={recapQuizScore}
              onChange={(e) => setRecapQuizScore(e.target.value)}
              defaultValue={recapQuizScore}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="24"
            />
          </Editable>

          <FormLabel>Topics Covered</FormLabel>
          <Editable
            text={topics}
            placeholder="Enter the topics covered"
            type="input"
            childRef={inputRef}
            size="md"
            inputWidth="8xl"
          >
            <Input
              type="text"
              name="topics"
              placeholder={topics}
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              defaultValue={topics}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="8xl"
              isRequired
            />
          </Editable>

          <FormLabel>Link(s) to Notion Notes (or similar)</FormLabel>
          <Editable
            text={notionLinks}
            placeholder="Links to Notion notes or alternative note taking applications eg. https://www.notion.so/Day-27-09-02-21-80fe53a30e254625bab3a9f187936081"
            type="input"
            childRef={inputRef}
            size="md"
            inputWidth="8xl"
          >
            <Input
              type="text"
              name="linkNotion"
              placeholder={notionLinks}
              value={notionLinks}
              onChange={(e) => setNotionLinks(e.target.value)}
              defaultValue={notionLinks}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="8xl"
            />
          </Editable>

          <FormLabel>Link(s) to GitHub Repositories</FormLabel>
          <Editable
            text={githubLinks}
            placeholder="Links to relevant GitHub repositories"
            type="input"
            childRef={inputRef}
            size="md"
            inputWidth="8xl"
          >
            <Input
              type="text"
              name="linkGithub"
              placeholder={githubLinks}
              value={githubLinks}
              onChange={(e) => setGithubLinks(e.target.value)}
              defaultValue={githubLinks}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="8xl"
            />
          </Editable>

          <FormLabel>Useful Resources Link(s)</FormLabel>
          <Editable
            text={additionalResourcesLinks}
            placeholder="Links to useful resources such as an article, tutorial, etc"
            type="input"
            childRef={inputRef}
            size="md"
            inputWidth="8xl"
          >
            <Input
              type="text"
              name="linkUsefulResources"
              placeholder={additionalResourcesLinks}
              value={additionalResourcesLinks}
              onChange={(e) => setAdditionalResourcesLinks(e.target.value)}
              defaultValue={additionalResourcesLinks}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="8xl"
            />
          </Editable>

          <FormLabel>Additional Notes</FormLabel>
          <Editable
            text={additionalNotes}
            placeholder="Links to useful resources such as an article, tutorial, etc"
            type="textarea"
            childRef={inputRef}
            size="md"
            inputWidth="8xl"
          >
            <Textarea
              name="linkUsefulResources"
              placeholder={additionalNotes}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              defaultValue={additionalNotes}
              disabled={isDisabled}
              variant="outline"
              size="md"
              width="8xl"
            />
          </Editable>

          <FormLabel>Uploaded Documents (.pdf)</FormLabel>
          <HStack>
            <Input
              type="file"
              multiple
              ref={fileInput}
              size="md"
              width="min-content"
              accept=".pdf"
              disabled={isDisabled}
            />
            <Button
              rightIcon={<FaCloudUploadAlt />}
              size="sm"
              colorScheme="blue"
              variant="outline"
              onClick={handleClick}
              disabled={isDisabled}
            >
              Upload Files
            </Button>
          </HStack>
          {uploadedDocuments.map((doc, index) => {
            return (
                <HStack spacing="9%" colorScheme="blue" color="blue.500" width="8xl">
                  <Heading size="sm">
                    {doc.slice(doc.lastIndexOf("/") + 1, doc.length)}
                  </Heading>

                  <IconButton
                    variant="outline"
                    colorScheme="red"
                    aria-label="Delete File"
                    icon={<DeleteIcon />}
                    onClick={()=>handleDeleteFile(doc, index)}
                  />
                </HStack>
            );
          })}
          
        </VStack>
        <VStack>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={updateEntry}
        >
          Update Entry
        </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default EditForm;
