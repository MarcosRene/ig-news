declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    STRIPE_API_KEY: string;
    STRIPE_SUBSCRIPTION_PRICE: string;
  }
}
