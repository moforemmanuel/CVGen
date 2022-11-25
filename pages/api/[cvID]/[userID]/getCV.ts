import nc from "next-connect"
import bcrypt from 'bcryptjs'

import getClient from "../../../../utils/sanityClient";
import { NextApiRequest, NextApiResponse } from "next"

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Requested Resource is not found");
  },
});

handler.get(async (req, res) => {
  console.log('in me cv id', req.query.cvID);
  const client = getClient(process.env.SANITY_AUTH_TOKEN as string);


  try {
    const data = await client.fetch(
      `*[_type == "cv" && _id == $id && user._ref == $ref][0]`, {
        id: req.query.cvID,
        ref: req.query.userID
      }
    );
    console.log('cv get: ', data);

    res.status(200).send(data);

  } catch (err) {
    console.log('from /api/getCV/ :', err);
    res.status(500).send(err);
  }
})

export default handler;