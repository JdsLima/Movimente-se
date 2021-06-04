import { MyThemeProvider } from '../contexts/ThemeContext';
import { Provider } from 'next-auth/client'
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <MyThemeProvider>
        <Component {...pageProps} />
      </MyThemeProvider>
    </Provider>
  );
}

export default MyApp
