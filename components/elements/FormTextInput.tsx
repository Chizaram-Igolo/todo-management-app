import * as React from "react";
import TextField from "@mui/material/TextField";

interface FormTextInputProps {
  value: string;
  error: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  value,
  error,
  changeHandler,
}) => {
  return (
    <TextField
      error={error}
      id="outlined-error"
      label="Content"
      placeholder="Enter in a new task"
      value={value}
      onChange={changeHandler}
    />
  );
};

export default FormTextInput;
