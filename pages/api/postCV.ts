import nc from "next-connect"
import bcrypt from 'bcryptjs'

import getClient from "../../utils/sanityClient";
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

handler.post(async (req, res) => {
  console.log('in me');
  const client = getClient(process.env.SANITY_AUTH_TOKEN as string);


  const doc = {
    _type: 'cv',
    ...req.body,
    user: {
      _type: 'reference',
      _ref: req.body.userID
    }
  }

  try {
    const data = await client.create(doc);
    console.log('cv post: ', data);
  

    
    res.status(201).send(data._id);

    

  } catch (err) {
    console.log('from /api/auth/signup/ :', err);
    res.status(500).send(err);
  }
})

export default handler;