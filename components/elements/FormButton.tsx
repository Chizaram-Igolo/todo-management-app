import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface FormButtonProps {
  label: string;
  color: string;
  submitting: boolean;
  compulsoryFieldEmpty: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  color,
  submitting,
  compulsoryFieldEmpty,
}) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        type="submit"
        color={color}
        disabled={submitting || compulsoryFieldEmpty}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default FormButton;
