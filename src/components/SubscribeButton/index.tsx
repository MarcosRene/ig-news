import { useSession, signIn } from 'next-auth/client';

import { api, getStripeClient } from '../../services';
import { Container } from './styles';

export const SubscribeButton = () => {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
    }

    try {
      const { data } = await api.post<{ sessionId: string }>('/subscribe');

      const { sessionId } = data;

      const stripe = await getStripeClient();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container type="button" onClick={handleSubscribe}>
      Subscribe now
    </Container>
  );
};
