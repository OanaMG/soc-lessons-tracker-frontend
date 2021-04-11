import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import S3 from "react-aws-s3";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputField, Textarea, Box} from "@chakra-ui/react";
import DatePicker from "react-datepicker"; //if needed we can also import register locale
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay } from "date-fns"; //if needed we can also import format, parseISO
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";
import {FaCloudUploadAlt} from 'react-icons/fa';


function EntryForm({ token }) {
  const { handleSubmit, errors, register, control, formState } = useForm(); //initially was just form state
  const fileInput = React.useRef();
  const [uploadedFilesPath, setUploadedFilesPath] = useState([]);

  var locations = [];

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
        // setUploadedFilesPath([...uploadedFilesPath, data.location]);
        locations.push(data.location);
        setUploadedFilesPath(locations);
        //console.log(data);
        //console.log(locations);
        //console.log(uploadedFilesPath)
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
      return ((date.slice(8,10)).concat(`-${date.slice(5,7)}-${date.slice(0,4)}`));
    }
  };

  function onSubmit(values, event) {
    console.log(values);
    postBooking(values);
    event.target.reset();   //date is refreshed if using input type date
    // window.location.reload();

  }

  const postBooking = (formData) => {
    console.log("in post booking"+ uploadedFilesPath)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Date: formatDate(formData.date), //formData.date, 
        Topics: formData.topics,
        NotionLinks: formData.linkNotion,
        AdditionalResourcesLinks: formData.linkUsefulResources, //parseInt(formData.number)
        AdditionalNotes: formData.additionalNotes,
        RecapQuizScore: formData.score,
        Token: token,
        UploadedDocuments: uploadedFilesPath, 
      }),
    };
    fetch(`${BACKEND_URL_DAILY_ENTRIES}`, requestOptions);
  };
  
  return (
    <Box width="100%">
    <form onSubmit={handleSubmit(onSubmit)}> 
        {/* <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">First name</FormLabel>
        <Input
          name="name"
          placeholder="name"
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl> */}

        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input name="date" type="date" ref={register({ required: true })}/>
        </FormControl>

        {/* <FormControl>
          <FormLabel>Daily Recap Quiz Score</FormLabel>
          <NumberInput min={0} max={10} width="3xs">
            <NumberInputField
              name="score"
              ref={register({ required: false })}
              placeholder="Enter score"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>  */}

        <FormControl>
          <FormLabel>Daily Recap Quiz Score</FormLabel>
          <Input
            type="number"
            name="score"
            ref={register({ required: false })}
            width="3xs"
            placeholder="Enter score"/>
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
          <FormLabel>Upload Documents</FormLabel>
          <Input type="file" multiple ref={fileInput} size="md" width="min-content"/>
          <Button rightIcon={<FaCloudUploadAlt />} size="sm" colorScheme="blue" variant="outline" onClick={handleClick}>
            Upload files
          </Button>

        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default EntryForm;