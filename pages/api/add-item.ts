import type { NextApiRequest, NextApiResponse } from "next";

import { connect } from "../../utils/connection";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const { client, todoitemsCollection } = await connect();

    if (client !== null && todoitemsCollection !== null) {
      const result = await todoitemsCollection.insertOne({
        content: data.content,
        dueDate: data.dueDate,
        status: data.status,
      });

      client.close();

      // On successful insertion.
      res.status(201).json({ message: "Insert successful!" });
    } else {
      console.log(`Couldn't connect to the database`);
    }
  }
}

export default handler;
