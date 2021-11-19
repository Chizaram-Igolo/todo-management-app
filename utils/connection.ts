import { MongoClient } from "mongodb";

export async function connect() {
  let client = null;
  let todoitemsCollection = null;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://chizaram:chizaram9@cluster0.wyjqa.mongodb.net/todoitems?retryWrites=true&w=majority"
    );
    const db = client.db();

    const todoitemsCollection = db.collection("todoitems");

    return { client, todoitemsCollection };
  } catch (err) {
    console.log(err);
    return { client, todoitemsCollection };
  }
}
