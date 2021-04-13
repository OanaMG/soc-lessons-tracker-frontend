import { useForm } from "react-hook-form";
import React, { useState } from "react";
import S3 from "react-aws-s3";
import { FormLabel, FormControl, FormHelperText, Input, Button, Textarea, Box} from "@chakra-ui/react";
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { FaCloudUploadAlt } from "react-icons/fa";
import FormAlertBox from "../FormAlertBox";

function EntryForm({ token }) {
  const { handleSubmit, register, formState } = useForm(); //initially was just form state
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

  console.log(uploadedFilesPath);

  function validateName(value) {
    if (!value) {
      return "Name is required";
    } else if (value !== "Naruto") {
      return "Jeez! You're not a fan 😱";
    } else return true;
  }

  const formatDate = (date) => {
    if (date !== undefined) {
      return date
        .slice(8, 10)
        .concat(`-${date.slice(5, 7)}-${date.slice(0, 4)}`);
    }
  };

  function onSubmit(values, event) {
    console.log(values);
    postBooking(values);
    event.target.reset();
  }

  const postBooking = (formData) => {
    console.log("in post booking" + uploadedFilesPath);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Date: formatDate(formData.date),
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

    fetch(`${BACKEND_URL_DAILY_ENTRIES}`, requestOptions)
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
  };

  return (
    <Box width="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            name="date"
            type="date"
            width="min-content"
            ref={register({ required: true })}
          />
        </FormControl>

        {/* For some reason the score input is taken as required and not sure why. Needs to be sorted out as the form can't be submitted without a score at the moment */}
        <FormControl>
          <FormLabel>Daily Quiz Score</FormLabel>
          <Input
            name="recapQuizScore"
            type="number"
            min={0}
            max={10}
            size="md"
            width="min-content"
            ref={register({ required: false })}
            placeholder="Score"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Topics Covered</FormLabel>
          <Input
            name="topics"
            size="md"
            ref={register({ required: true })}
            placeholder="Topics covered today eg. react router, auth0. You can include multiple topics"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Link(s) to Notion Notes (or similar)</FormLabel>
          <Input
            name="linkNotion"
            size="md"
            ref={register({ required: false })}
            placeholder="Links to Notion notes or alternative note taking applications eg. https://www.notion.so/Day-27-09-02-21-80fe53a30e254625bab3a9f187936081"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Link(s) to GitHub Repositories</FormLabel>
          <Input
            name="linkGithub"
            size="md"
            ref={register({ required: false })}
            placeholder="Links to relevant GitHub repositories"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Useful Resources Link(s)</FormLabel>
          <Input
            name="linkUsefulResources"
            type="text"
            size="md"
            ref={register({ required: false })}
            placeholder="Links to useful resources such as an article, tutorial, etc"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Additional Notes</FormLabel>
          <Textarea
            name="additionalNotes"
            size="md"
            ref={register({ required: false })}
            placeholder="Please add any additional notes you have"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Upload Documents (.pdf)</FormLabel>
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
          <FormHelperText>
            If you have chosen to upload documents, don't forget to press Upload
            Files before submitting this entry!
          </FormHelperText>
        </FormControl>

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>

      <FormAlertBox
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isErrorOpen}
        headerText="Oops!"
        bodyText="There's been an issue submitting this entry. Please check, as there might already
        be an entry added for this date!"
      />

      <FormAlertBox
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isSuccessfulOpen}
        headerText="Congratulations!"
        bodyText="This entry has been successfully added and can now be viewed on the View Entry page"
      />
    </Box>
  );
}

export default EntryForm;
