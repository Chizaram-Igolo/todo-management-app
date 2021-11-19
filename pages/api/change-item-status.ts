import type { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import { connect } from "../../utils/connection";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PATCH") {
    const data = req.body;

    console.log(data._id);

    const { client, todoitemsCollection } = await connect();

    if (client !== null && todoitemsCollection !== null) {
      let newStatus: string;

      // Toggle status.
      if ((data.itemStatus = "unfinished")) {
        newStatus = "done";
      } else {
        newStatus = "unfinished";
      }

      const result = await todoitemsCollection.updateOne(
        { _id: new ObjectId(data._id) },
        {
          $set: {
            status: newStatus,
          },
        }
      );

      client.close();

      console.log(result);

      // On successful insertion.
      res.status(201).json({ message: "Update succesful!" });
    } else {
      console.log(`Couldn't connect to the database`);
    }
  }
}

export default handler;
