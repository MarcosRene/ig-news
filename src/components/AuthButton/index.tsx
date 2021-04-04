import { signIn, signOut, useSession } from 'next-auth/client';

import { useTheme } from 'styled-components';
import { GoMarkGithub, GoX } from 'react-icons/go';

import * as S from './styles';

const handleSignIn = () => signIn('github');
const handleSignOut = () => signOut();

export const AuthButton = () => {
  const theme = useTheme();

  const [session] = useSession();

  const handleAuth = session ? handleSignOut : handleSignIn;

  const githubIconColor = theme.colors[session ? 'green' : 'yellow'];

  return (
    <S.Container type="button" onClick={handleAuth}>
      <GoMarkGithub color={githubIconColor} size="1.25rem" />
      <span>{session?.user?.name ?? 'Sign in with GitHub'}</span>

      {session && <GoX color={theme.colors.detailLight} size="1.25rem" />}
    </S.Container>
  );
};
