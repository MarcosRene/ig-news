import { query as q } from 'faunadb';

export const getUserByEmail = (email: string) =>
  q.Match(q.Index('user_by_email'), q.Casefold(email));

export const getUserByStripeId = (stripe_customer_id: string) =>
  q.Match(q.Index('user_by_stripe_customer_id'), stripe_customer_id);
