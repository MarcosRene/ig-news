import { loadStripe } from '@stripe/stripe-js';

export const getStripeClient = () =>
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
