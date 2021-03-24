import { Header } from 'components/Header';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/global.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Bootcamp Ignite, chapter 03 aplicação da um app com Next, Primic, FaunaDB and Strapi"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default App;
