import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ItemCheckbox from "./ItemCheckbox";

import Snackbar from "@mui/material/Snackbar";

import { ObjectId } from "bson";

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  parentFlex: { display: "flex" },
  parentFlexLeft: {
    display: "flex",
    marginRight: "auto",
  },
  parentFlexRight: {
    display: "flex",
    marginLeft: "auto",
  },
}));

interface ItemCardProps {
  itemNum: number;
  itemId: ObjectId;
  itemContent: string;
  itemDueDate: Date;
  itemStatus: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  itemNum,
  itemId,
  itemDueDate,
  itemContent,
  itemStatus,
}): JSX.Element => {
  const router = useRouter();

  const classes = useStyles();

  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = () => {
    setSnackOpen(false);
  };

  const deleteHandler = async () => {
    const response = await fetch("/api/delete-item", {
      method: "DELETE",
      body: JSON.stringify({ _id: itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      setSnackOpen(true);
    }

    router.replace("/");
  };

  const changeItemStatusHandler = async () => {
    const response = await fetch("/api/change-item-status", {
      method: "PATCH",
      body: JSON.stringify({ _id: itemId, itemStatus: itemStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.replace("/");
  };

  return (
    <Box sx={{ minWidth: "50%" }}>
      <Card
        variant="outlined"
        sx={{ minWidth: 275 }}
        className={classes.parentFlex}
      >
        <CardContent>
          <Box className={classes.parentFlexLeft}>
            <ItemCheckbox
              isChecked={itemStatus === "done" ? true : false}
              changeHandler={() => changeItemStatusHandler()}
            />
            <Typography sx={{ mt: 1.3 }}>
              {itemStatus === "done" && (
                <strong style={{ textDecoration: "line-through" }}>
                  {itemContent}
                </strong>
              )}

              {itemStatus === "unfinished" && <strong>{itemContent}</strong>}
            </Typography>
          </Box>
          <Typography
            sx={{ mb: 0, fontSize: "14px", ml: 5 }}
            color="text.secondary"
          >
            #{itemNum} • <em>due by</em> {new Date(itemDueDate).toDateString()}
          </Typography>
        </CardContent>

        <div></div>
        <div className={classes.parentFlexRight}>
          <CardActions sx={{ mt: -1.4, fontSize: "14px" }}>
            <Link href={`${itemId}`}>
              <a>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </a>
            </Link>
          </CardActions>
          <CardActions sx={{ mt: -1.4, fontSize: "14px" }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteHandler()}
            >
              Delete
            </Button>
          </CardActions>
        </div>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your item was deleted!"
      />
    </Box>
  );
};

export default ItemCard;
