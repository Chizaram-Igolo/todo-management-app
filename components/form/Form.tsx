import React, { useState } from "react";
import FormDateTimePicker from "../elements/FormDateTimePicker";
import FormTextInput from "../elements/FormTextInput";
import FormButton from "../elements/FormButton";

import Box from "@mui/material/Box";

function Form() {
  const [newItemContent, setNewItemContent] = useState("");
  const [newItemDueDate, setNewItemDueDate] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  let submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    setNewItemContent("");
    setSubmitting(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <FormTextInput />
        <FormDateTimePicker />
        <FormButton label="Add Item" />
      </Box>
    </form>
  );
}

export default Form;
