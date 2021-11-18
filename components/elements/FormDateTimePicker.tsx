import * as React from "react";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function FormDateTimePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <DateTimePicker
      renderInput={(props) => <TextField {...props} />}
      label="Due Date"
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  );
}
