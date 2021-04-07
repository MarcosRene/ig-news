import React from 'react';

import { ActiveLink } from '../ActiveLink';
import { AuthButton } from '../AuthButton';
import { Container } from './styles';

export const Header = () => (
  <Container>
    <header>
      <img src="/images/logo.svg" alt="ig.news" />

      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/posts">Posts</ActiveLink>
      </nav>

      <AuthButton />
    </header>
  </Container>
);
