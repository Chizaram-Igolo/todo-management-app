import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface ItemCheckboxProps {
  isChecked: boolean;
}

const ItemCheckbox: React.FC<ItemCheckboxProps> = ({ isChecked }) => {
  return <Checkbox {...label} defaultChecked={isChecked} />;
};

export default ItemCheckbox;
