import { useForm, useWatch } from "react-hook-form";
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
} from "@chakra-ui/react";
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { FaCloudUploadAlt } from "react-icons/fa";
import FormAlertBox from "../FormAlertBox";
import { useAuth0 } from "@auth0/auth0-react";
import Editable from "../Editable";


function EditForm({ token }) {
  const { handleSubmit, control, register, formState } = useForm(); //initially was just form state
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
  const [topics, setTopics] = useState("TBA");
  const [recapQuizScore, setRecapQuizScore] = useState("TBA");
  const [notionLinks, setNotionLinks] = useState("TBA");
  const [githubLinks, setGithubLinks] = useState("TBA");
  const [additionalResourcesLinks, setAdditionalResourcesLinks] = useState("TBA");
  const [additionalNotes, setAdditionalNotes] = useState("TBA");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // useEffect(() => {
  //   getEntryByDate();
  // }, [entryDate]);

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
      }
    }
  }

  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  };

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(config);
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

  //console.log(uploadedFilesPath);

  function onSubmit(values, event) {
    console.log(values);
    //postBooking(values);
    //event.target.reset();
  }

  const postBooking = (formData) => {
    console.log("in post booking" + uploadedFilesPath);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Date: formData.date,
        Topics: formData.topics,
        NotionLinks: formData.linkNotion,
        AdditionalResourcesLinks: formData.linkUsefulResources,
        GithubLinks: formData.linkGithub,
        AdditionalNotes: formData.additionalNotes,
        RecapQuizScore: formData.recapQuizScore,
        Token: token,
        UploadedDocuments: uploadedFilesPath,
      }),
    };
  };

  function SelectEditEntry() {
    if (entryDate !== null && entryDate !== "") {
      setIsDisabled(false);
      getEntryByDate();
      console.log("date selected " + entryDate);
    } else {
      console.log("no date added");
    }
  }

  const [task, setTask] = useState("");
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
              onClick={SelectEditEntry}
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
            onChange={e => setRecapQuizScore(e.target.value)}
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
            onChange={e => setTopics(e.target.value)}
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
            onChange={e => setNotionLinks(e.target.value)}
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
            onChange={e => setGithubLinks(e.target.value)}
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
            onChange={e => setAdditionalResourcesLinks(e.target.value)}
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
            onChange={e => setAdditionalNotes(e.target.value)}
            defaultValue={additionalNotes}
            disabled={isDisabled}
            variant="outline"
            size="md"
            width="8xl"
          />
        </Editable>

        <FormLabel>Uploaded Documents (.pdf)</FormLabel> 
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
          <HStack>
          <Input
            type="file"
            multiple
            ref={fileInput}
            size="md"
            width="min-content"
            accept=".pdf"
          />
            <Button
            rightIcon={<FaCloudUploadAlt />}
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleClick}
          >
            Upload files
          </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export default EditForm;
