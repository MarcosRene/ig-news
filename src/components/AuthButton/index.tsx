import { useState } from 'react';

import { GoMarkGithub, GoX } from 'react-icons/go';
import { useTheme } from 'styled-components';

import { Container } from './styles';

export const AuthButton = () => {
  const theme = useTheme();

  const [isLoggedIn] = useState(false);

  const githubIconColor = theme.colors[isLoggedIn ? 'green' : 'yellow'];

  return (
    <Container type="button">
      <GoMarkGithub color={githubIconColor} size="1.25rem" />
      <span>Sign in with Github</span>
      {isLoggedIn && <GoX color={theme.colors.detailLight} size="1.25rem" />}
    </Container>
  );
};
