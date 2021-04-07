import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { query as q } from 'faunadb';

import { fauna } from '../../../services';
import { getUserByEmail } from '../utils';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    async signIn(user) {
      try {
        await fauna.query(
          q.If(
            q.Not(q.Exists(getUserByEmail(user.email))),
            q.Create(q.Collection('users'), { data: { email: user.email } }),
            q.Get(getUserByEmail(user.email)),
          ),
        );

        return true;
      } catch {
        return false;
      }
    },
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select('ref', q.Get(getUserByEmail(session.user.email))),
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ]),
          ),
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
  },
});
