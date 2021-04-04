import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { query as q } from 'faunadb';

import { fauna, stripe } from '../../../services';
import { getUserByEmail } from '../utils';

type Faunadb = {
  ref: {
    id: string;
  };
  data: {
    email: string;
    stripe_custom_id?: string;
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json('Method not allowed');
  }

  const session = await getSession({ req });

  const user = await fauna.query<Faunadb>(
    q.Get(getUserByEmail(session.user.email)),
  );

  let stripeCostumerId = user.data.stripe_custom_id;

  if (!stripeCostumerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
    });

    await fauna.query(
      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      }),
    );

    stripeCostumerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCostumerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [{ price: process.env.STRIPE_SUBSCRIPTION_PRICE, quantity: 1 }],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: `${process.env.HOST_URL}/posts`,
    cancel_url: `${process.env.HOST_URL}`,
  });

  return res.status(200).json({ sessionId: stripeCheckoutSession.id });
};
