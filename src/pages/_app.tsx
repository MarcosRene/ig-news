import { ThemeProvider } from 'styled-components';

import { Header } from '../components';
import GlobalStyles from '../../styles/global';
import theme from '../../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default MyApp;
