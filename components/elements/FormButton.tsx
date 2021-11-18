import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface FormButtonProps {
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({ label }): JSX.Element => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">{label}</Button>
    </Stack>
  );
};

export default FormButton;
