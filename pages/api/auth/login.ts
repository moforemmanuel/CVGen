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
    matricule,
    password
  } = req.body;

  try {
    const data = await client.fetch(
      `*[_type == "user" && matricule == $matricule][0]`,
      {
        matricule
      }
    );

    if (!data) {
      res.status(401).send({ message: 'No user with that Matricule' });

    }

    else if (data && bcrypt.compareSync(password, data.password)) {
      const user = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        matricule: data.matricule,
        email: data.email,
      };

      res.status(200).send(user)
    console.log('from /api/auth/login/ :', data);

    } else {
      res.status(401).send({ message: 'Invalid Password' });

    }

  } catch (err) {
    console.log('from /api/auth/signup/ :', err);
    res.status(500).send(err);
  }
})

export default handler;