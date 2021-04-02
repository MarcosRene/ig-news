import { Container, NavLink } from './styles';

export const Header = () => (
  <Container>
    <header>
      <img src="/images/logo.svg" alt="ig.news" />

      <nav>
        <NavLink active href="/">
          Home
        </NavLink>
        <NavLink active={false} href="/posts">
          Posts
        </NavLink>
      </nav>
    </header>
  </Container>
);
