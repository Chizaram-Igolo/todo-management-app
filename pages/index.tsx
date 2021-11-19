import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Form from "../components/form/Form";
import styles from "../styles/Home.module.css";
import { todoItem } from "../types/todoItem";

import { MongoClient } from "mongodb";

import ItemList from "./item-list";

interface HomeProps {
  items: todoItem[];
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Add Your Todo Item</title>
        <meta
          name="description"
          content="Add your todo item and view your todo items here"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {props.items && <ItemList items={props.items} />}
      </main>

      <footer className={styles.footer}>
        <Form
          operationType="add"
          defaultContent=""
          defaultDueDate={new Date()}
          contentId={""}
        />
      </footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from the database

  let items: todoItem[] = [];

  const client = await MongoClient.connect(
    "mongodb+srv://chizaram:chizaram9@cluster0.wyjqa.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todoitemsCollection = db.collection("todoitems");

  items = (await todoitemsCollection.find().toArray()) as todoItem[];

  return {
    props: {
      items: items.map((item) => ({
        content: item.content,
        dueDate: item.dueDate,
        status: item.status,
        _id: item._id.toString(),
      })),
    },
  };
};

export default Home;
