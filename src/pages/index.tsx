import { GetStaticProps } from 'next';

import { MetaTags, SubscribeButton } from '../components';
import { Container, Section } from '../../styles/home';
import { stripe } from '../services';

type Product = {
  priceId: string;
  amount: string;
};

type HomeProps = {
  product: Product;
};

export default function Home({ product }: HomeProps) {
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
            Get access to all the articles
            <strong>for {`${product.amount}/month`}</strong>
          </p>

          <SubscribeButton />
        </Section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await stripe.prices.retrieve(
    process.env.STRIPE_SUBSCRIPTION_PRICE,
  );

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const product = {
    priceId: data.id,
    amount: currencyFormatter.format(data.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};
