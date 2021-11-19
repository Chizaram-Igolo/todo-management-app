import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface FormButtonProps {
  label: string;
  typeOfBtn: string;
  submitting: boolean;
  compulsoryFieldEmpty: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  typeOfBtn,
  submitting,
  compulsoryFieldEmpty,
}) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        type="submit"
        color={typeOfBtn === "errBtn" ? "error" : "primary"}
        disabled={submitting || compulsoryFieldEmpty}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default FormButton;
