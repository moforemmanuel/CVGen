import nc from "next-connect"
import bcrypt from 'bcryptjs'

import getClient from "../../../utils/sanityClient";
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

  const {
    firstName,
    lastName,
    matricule,
    email,
    password
  } = req.body;

  let existingUser = await client.fetch(
    `*[_type == "user" && matricule == $matricule][0]`,
    {
      matricule: matricule
    }
  );

  if (!existingUser) {
    const existingEmail = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      {
        email
      }
    );

    if (existingEmail) {
      return res.status(403).send({message: 'User with that Email Exists'});
    }
  }

  if (existingUser) {
    return res.status(403).send({message: 'User with that Matricule Exists'});
  }

  const doc = {
    _type: 'user',
    firstName,
    lastName,
    matricule,
    email,
    password: bcrypt.hashSync(password),
  }

  try {
    const data = await client.create(doc);
    console.log('from /api/auth/signup/ :', data);

    res.status(201).send(data)
  } catch (err) {
    console.log('from /api/users/register/ :', err);
    res.status(500).send(err);
  }
})

export default handler;