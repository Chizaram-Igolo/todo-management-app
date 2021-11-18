import Link from "next/link";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ItemCheckbox from "./ItemCheckbox";

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
    margin: "3rem",
  },
  media: {
    height: 140,
  },
}));

interface ItemCardProps {
  itemNum: number;
  itemContent: string;
  itemDueDate: string;
  itemStatus: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  itemNum,
  itemDueDate,
  itemContent,
  itemStatus,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Box sx={{ minWidth: "50%", width: "100%" }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              #{itemNum}
            </Typography>
            <Typography variant="h6" component="div">
              <strong>{itemContent}</strong>
            </Typography>
            <Typography sx={{ mb: 0.4 }} color="text.secondary" variant="p">
              Due by {itemDueDate}
            </Typography>
            <ItemCheckbox isChecked={itemStatus === "done" ? true : false} />
          </CardContent>

          <CardActions>
            <Link href={`/items/${itemNum}`}>
              <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                Edit
              </Button>
            </Link>
          </CardActions>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default ItemCard;
