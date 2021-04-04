/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

import { Readable } from 'stream';
import { Stripe } from 'stripe';

import { stripe } from '../../../services';
import { saveSubscription } from '../lib/manage-subscription';
import { RELEVANT_EVENTS, SUBSCRIPTION_EVENTS } from './constants';

const buffer = async (readable: Readable) => {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};

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

  try {
    switch (eventType) {
      case SUBSCRIPTION_EVENTS.updated:
      case SUBSCRIPTION_EVENTS.deleted: {
        const subscrition = event.data.object as Stripe.Subscription;

        await saveSubscription(
          {
            subscriptionId: subscrition.id,
            customerId: subscrition.customer.toString(),
          },
          false,
        );
        break;
      }
      case 'checkout.session.completed': {
        const { customer, subscription } = event.data
          .object as Stripe.Checkout.Session;

        await saveSubscription({
          subscriptionId: customer.toString(),
          customerId: subscription.toString(),
        });
        break;
      }

      default:
        throw new Error('Unhandled Event');
    }
  } catch (err) {
    return res.json({ error: 'Webhook handler failed.' });
  }

  return res.send('Subscription Completed');
};

export const config = {
  api: {
    bodyParser: false,
  },
};
