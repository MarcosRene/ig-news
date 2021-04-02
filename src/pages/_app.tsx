import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import { ThemeProvider } from 'styled-components';

import { Header } from '../components';
import GlobalStyles from '../../styles/global';
import theme from '../../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
