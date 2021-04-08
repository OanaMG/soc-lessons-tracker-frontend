import { useForm, Controller } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, NumberInput, NumberInputField, Textarea, Box
} from "@chakra-ui/react";
import DatePicker from "react-datepicker"; //if needed we can also import register locale
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay } from 'date-fns';  //if needed we can also import format, parseISO


 function EntryForm() {
  const { handleSubmit, errors, register, control, formState } = useForm();

  function validateName(value) {
    if (!value) {
      return "Name is required";
    } else if (value !== "Naruto") {
      return "Jeez! You're not a fan 😱";
    } else return true;
  }

  function validateDate(value) {
    if (!value) {
      return "Date is required";
    } else return true;
  }

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Box w="100%"> 
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
            <FormLabel htmlFor="name">Date</FormLabel>
            <section>
            <Controller
                name="date"
                control={control}
                render={(props) => (
                <DatePicker
                    placeholderText="    Select Entry Date"
                    onChange={(e) => props.onChange(e)}
                    selected={props.value}
                    dateFormat="dd-MM-yyyy"
                    // defaultValue={startOfDay(new Date())}
                    // minDate={startOfDay(new Date())} 
                />
                )}
                ref={register({ required: true })}
            />
          </section>
        </FormControl>

        <FormControl>
            <FormLabel>Daily Recap Quiz Score</FormLabel>
            <NumberInput min={0} max={10} width="3xs">
                <NumberInputField name="score" placeholder="Enter score" ref={register({ required: true })}/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Topics Covered</FormLabel>
            <Input name="topics" size="md" placeholder="Topics covered today eg. react router, auth0. You can include multiple topics" ref={register({ required: true })}/>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Link(s) to Notion Notes (or similar)</FormLabel>
            <Input name="linkNotion" size="md" placeholder="Links to Notion notes or alternative note taking applications eg. https://www.notion.so/Day-27-09-02-21-80fe53a30e254625bab3a9f187936081" ref={register({ required: true })}/>
        </FormControl>

        <FormControl>
            <FormLabel>Useful Resources Link(s)</FormLabel>
            <Input name="linkUsefulResources" size="md" placeholder="Links to useful resources such as an article, tutorial, etc"/>
        </FormControl>

        <FormControl> 
            <FormLabel>Additional Notes</FormLabel>
            <Textarea name="additionalNotes" size="md" placeholder="Please add any additional notes you have"/>
        </FormControl>

        <FormControl> 
            <FormLabel>Upload Documents</FormLabel>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
        </Button>


    </form>
    </Box>
  );
}

export default EntryForm;