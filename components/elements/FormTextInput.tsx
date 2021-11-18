import * as React from "react";
import TextField from "@mui/material/TextField";

export default function FormTextInput() {
  return (
    <TextField
      error={false}
      id="outlined-error"
      label="Content"
      placeholder="Enter in a new task"
      defaultValue=""
    />
  );
}
