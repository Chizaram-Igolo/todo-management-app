import * as React from "react";
import TextField from "@mui/material/TextField";

interface FormTextInputProps {
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  value,
  changeHandler,
}) => {
  return (
    <TextField
      error={false}
      id="outlined-error"
      label="Content"
      placeholder="Enter in a new task"
      value={value}
      onChange={changeHandler}
    />
  );
};

export default FormTextInput;
