import Link from "next/link";

import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ObjectId } from "bson";
import { useRouter } from "next/router";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Form from "../../components/form/Form";

import { connect } from "../../utils/connection";
import { todoItem } from "../../types/todoItem";

import styles from "./editItem.module.css";
import FormButton from "../../components/elements/FormButton";

import { Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  parentFlex: { display: "flex" },
  parentFlexLeft: {
    display: "flex",
    marginRight: "auto",
  },

  parentFlexRight: {
    // display: "flex",
    marginLeft: "auto",
    // justifyItems: "flex-end",
    // float: "right",
  },
}));

interface EditItemPageProps {
  itemData: todoItem;
}

const EditItemPage: NextPage<EditItemPageProps> = (props) => {
  const classes = useStyles();

  const router = useRouter();

  let itemId = router.query.editId;

  const [newItem, setNewItem] = useState("itemContent");
  const [submitting, setSubmitting] = useState(false);

  async function editItemHandler(enteredItemData: todoItem) {
    const response = await fetch("/api/add-item", {
      method: "POST",
      body: JSON.stringify(enteredItemData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Your Todo Item</title>
        <meta name="description" content="Edit your todo item here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box>
          <br />
          <Link href="/">
            <a>
              <FormButton
                label="Cancel"
                typeOfBtn="errBtn"
                submitting={false}
                compulsoryFieldEmpty={false}
              />
            </a>
          </Link>
          <br />
        </Box>

        <Box sx={{ minWidth: "50%" }}>
          <Card
            variant="outlined"
            sx={{ minWidth: 275 }}
            className={classes.parentFlex}
          >
            <CardContent>
              <Typography sx={{ mb: 3 }}>Edit your Todo Item</Typography>
              <Box className={classes.parentFlexLeft}>
                <Form
                  operationType="update"
                  defaultContent={props.itemData.content}
                  defaultDueDate={new Date(props.itemData.dueDate)}
                  contentId={props.itemData._id.toString()}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch data from the database

  let selectedItem: todoItem;

  const itemId: string = context.params?.editId as string;

  const { client, todoitemsCollection } = await connect();

  if (client !== null && todoitemsCollection !== null) {
    selectedItem = (await todoitemsCollection.findOne({
      _id: new ObjectId(itemId),
    })) as todoItem;

    client.close();

    return {
      props: {
        itemData: {
          content: selectedItem.content,
          dueDate: selectedItem.dueDate,
          status: selectedItem.status,
          _id: selectedItem._id.toString(),
        },
      },
    };
  } else {
    console.log(`Couldn't connect to the database`);

    return {
      props: {
        itemData: {
          content: "",
          dueDate: "",
          status: "",
          _id: "",
        },
      },
    };
  }
};

export default EditItemPage;
