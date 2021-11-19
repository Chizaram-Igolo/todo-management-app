import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface ItemCheckboxProps {
  isChecked: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemCheckbox: React.FC<ItemCheckboxProps> = ({
  isChecked,
  changeHandler,
}) => {
  return (
    <Checkbox {...label} defaultChecked={isChecked} onChange={changeHandler} />
  );
};

export default ItemCheckbox;
