// import sanityClient from '@sanity/client'


// const client = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_NODE_ENV,
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
//   token: process.env.SANITY_AUTH_TOKEN ? process.env.SANITY_AUTH_TOKEN : undefined,
//   useCdn: true
// });

// export default client;

import client from '@sanity/client';

export default function getClient(token: string) {
  return client({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_NODE_ENV,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: token? token : undefined,
    useCdn: true,
  });
}