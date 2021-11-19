import { useRouter } from "next/router";

import React, { useState } from "react";
import FormDateTimePicker from "../elements/FormDateTimePicker";
import FormTextInput from "../elements/FormTextInput";
import FormButton from "../elements/FormButton";

import { ObjectId } from "mongodb";

import Snackbar from "@mui/material/Snackbar";

import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { todoItem } from "../../types/todoItem";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 395,
    margin: "3rem",
  },
  marginRight: {
    marginRight: 20,
  },
  parentFlex: { display: "flex", minWidth: "600px" },
}));

interface FormProps {
  operationType: string;
  defaultContent: string;
  defaultDueDate: Date | null;
  // For updates
  contentId: ObjectId | null;
}

const Form: React.FC<FormProps> = (props) => {
  const router = useRouter();

  const classes = useStyles();

  const [enteredContent, setEnteredContent] = useState(props.defaultContent);
  const [enteredDueDate, setEnteredDueDate] = useState<Date | null>(
    props.defaultDueDate
  );
  const [snackOpen, setSnackOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setSnackOpen(false);
  };

  let submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;

  submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare the data body to be sent to the request.
    let todoItemData: todoItem = {
      content: enteredContent,
      dueDate: enteredDueDate,
      status: "unfinished",
      _id: null,
    };

    let url: string;
    let methodType: string;

    // Find out the kind of insertion we are supposed to make.
    if (props.operationType === "update") {
      url = "/api/update-item";
      methodType = "PATCH";
      todoItemData["_id"] = props.contentId;
    } else {
      url = "/api/add-item";
      methodType = "POST";
    }

    // Run the insertion.
    const response = await fetch(url, {
      method: methodType,
      body: JSON.stringify(todoItemData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      setSnackOpen(true);
    }

    setEnteredContent("");
    setEnteredDueDate(new Date());
    setSubmitting(false);

    router.replace("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <Box className={classes.parentFlex}>
        <Box className={classes.marginRight}>
          <FormTextInput
            value={enteredContent}
            changeHandler={(e) => setEnteredContent(e.target.value)}
          />
        </Box>
        <Box className={classes.marginRight}>
          <FormDateTimePicker
            value={enteredDueDate}
            changeHandler={setEnteredDueDate}
          />
        </Box>
        <Box sx={{ mt: 2.2 }}>
          <FormButton
            label={props.operationType === "update" ? "Save" : "Add Item"}
            color="primary"
            submitting={submitting}
            // Make sure compulsory field is not empty
            compulsoryFieldEmpty={!enteredContent ? true : false}
          />
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your list was updated!"
      />
    </form>
  );
};

export default Form;
