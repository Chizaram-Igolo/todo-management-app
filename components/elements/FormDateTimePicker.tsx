import * as React from "react";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { DateTimePickerView } from "@mui/lab/DateTimePicker/shared";

interface FormDateTimePickerProps {
  value: Date | null;
  changeHandler: React.Dispatch<React.SetStateAction<Date | null>>;
}

const FormDateTimePicker: React.FC<FormDateTimePickerProps> = ({
  value,
  changeHandler,
}) => {
  return (
    <DateTimePicker
      renderInput={(props) => <TextField {...props} />}
      label="Due Date"
      value={value}
      onChange={(newValue) => {
        changeHandler(newValue);
      }}
    />
  );
};

export default FormDateTimePicker;
