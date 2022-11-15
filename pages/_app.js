// import '../styles/globals.css';
import 'bulma/css/bulma.min.css';
import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    )
}

export default MyApp
