import Head from 'next/head'
import '@styles/global.css'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <title>HR | ZACAPA</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp
