import { SiteClient } from 'datocms-client';

export default async (req, res) => {
  if (req.method === 'POST') {
    const client = new SiteClient(process.env.CREATE_COMMUNITY_TOKEN);

    const newRecord = await client.items.create({
      itemType: '966845', // Model ID
      ...req.body,
    });

    res.status(200).json({ newRecord: newRecord });

    return;
  } else if (req.method === 'GET') {
    await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: process.env.READ_ONLY_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query { allCommunities { id creatorSlug title imageUrl } }`,
      }),
    }).then(async (response) => {
      const responseJSON = await response.json();
      res.status(200).json(responseJSON);
    });

    return;
  }

  res.status(404).json({
    message: 'Not found',
  });
};
