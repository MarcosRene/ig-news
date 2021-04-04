export const SUBSCRIPTION_EVENTS = {
  updated: 'customers.subscription.updated',
  deleted: 'customers.subscription.deleted',
};

export const RELEVANT_EVENTS = new Set([
  'checkout.session.completed',
  SUBSCRIPTION_EVENTS.updated,
  SUBSCRIPTION_EVENTS.deleted,
]);
