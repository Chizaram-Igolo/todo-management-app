import type { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import { connect } from "../../utils/connection";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PATCH") {
    const data = req.body;

    const { client, todoitemsCollection } = await connect();

    if (client !== null && todoitemsCollection !== null) {
      const result = await todoitemsCollection.updateOne(
        { _id: new ObjectId(data._id) },
        {
          $set: {
            content: data.content,
            dueDate: data.dueDate,
            status: "unfinished",
          },
        }
      );

      client.close();

      // On successful insertion.
      res.status(201).json({ message: "Update succesful!" });
    } else {
      console.log(`Couldn't connect to the database`);
    }
  }
}

export default handler;
