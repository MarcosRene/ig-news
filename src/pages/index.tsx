import { MetaTags } from '../components';
import { Container, Section } from '../../styles/home';

export default function Home() {
  return (
    <>
      <MetaTags title="Home" />

      <Container>
        <Section>
          <span>👋️ Hey, welcome</span>

          <h1>
            News about <br />
            the <strong>React</strong> world
          </h1>
          <p>
            Get access to all the articles <strong>for U$9.90/month</strong>
          </p>
        </Section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </Container>
    </>
  );
}
