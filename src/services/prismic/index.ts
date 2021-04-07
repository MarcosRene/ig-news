import Prismic from '@prismicio/client';

export const getPrismicClient = (req?: unknown) =>
  Prismic.client(process.env.PRISMIC_API_URL, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
