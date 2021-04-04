/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

import { Readable } from 'stream';
import Stripe from 'stripe';

import { stripe } from '../../../services';

const buffer = async (readable: Readable) => {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};

const RELEVANT_EVENTS = new Set(['checkout.session.completed']);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json('Method not allowed');
  }

  const bufferdReq = await buffer(req);
  const secret = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    stripe.webhooks.constructEvent(
      bufferdReq,
      secret,
      process.env.STRIPE_WEBHOOK_KEY,
    );
  } catch (err) {
    return res.status(401).send(`Webhook error: ${err.message}`);
  }

  const eventType = event.type;

  if (!RELEVANT_EVENTS.has(eventType)) {
    return res.json({ received: true });
  }

  console.log({ event });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
