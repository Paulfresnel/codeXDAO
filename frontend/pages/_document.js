

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        
			<title>CodeX DAO: Your portal to the web3 World</title>
		
         <link rel="shortcut icon" href="/codexDAO-logo(1).png" type="image/x-icon" />
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
         <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;