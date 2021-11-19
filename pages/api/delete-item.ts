import type { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "bson";

import { connect } from "../../utils/connection";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "DELETE") {
    const data = req.body;

    console.log(typeof data.itemId);
    const { client, todoitemsCollection } = await connect();

    if (client !== null && todoitemsCollection !== null) {
      const result = await todoitemsCollection.deleteOne({
        _id: new ObjectId(data.itemId),
      });

      client.close();

      // On successful deletion.
      console.log(result);
      res.status(200).json({ message: "Delete successful!" });
    } else {
      console.log(`Couldn't connect to the database`);
    }
  }
}

export default handler;
