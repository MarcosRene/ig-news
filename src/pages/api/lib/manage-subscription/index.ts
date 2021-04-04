import { query as q } from 'faunadb';

import { fauna, stripe } from '../../../../services';
import { getUserByStripeId } from '../../utils';

type SaveSubscription = {
  subscriptionId: string;
  customerId: string;
  isCreateSubscription?: boolean;
};

type UserRef = {
  id: string;
};

export const saveSubscription = async (
  { subscriptionId, customerId }: SaveSubscription,
  isCreateSubscription = false,
) => {
  const userRefPromise = await fauna.query<UserRef>(
    q.Select('ref', q.Get(getUserByStripeId(customerId))),
  );

  const subscripetionPromise = stripe.subscriptions.retrieve(subscriptionId);

  const [userRef, subscription] = await Promise.all([
    userRefPromise,
    subscripetionPromise,
  ]);

  const subscriptionData = {
    id: subscription.id,
    user: userRef.id,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (isCreateSubscription) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), {
        data: subscriptionData,
      }),
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
        ),
        { data: { subscriptionData } },
      ),
    );
  }
};
