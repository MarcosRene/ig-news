import { useSession, signIn } from 'next-auth/client';

import { stripe } from '../../services';
import { Container } from './styles';

export const SubscribeButton = () => {
  const [session] = useSession();

  const handleSubscribe = () => {
    if (!session) {
      signIn('github');
    }
  };

  return (
    <Container type="button" onClick={handleSubscribe}>
      Subscribe now
    </Container>
  );
};
