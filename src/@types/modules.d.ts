declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    HOST_URL: string;
    STRIPE_API_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    STRIPE_SUBSCRIPTION_PRICE: string;
    STRIPE_WEBHOOK_KEY: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    FAUNADB_KEY: string;
    PRISMIC_ACCESS_TOKEN: string;
    PRISMIC_API_URL: string;
  }
}
