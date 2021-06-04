import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&Poppins:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
                    <script src="https://kit.fontawesome.com/64d58efce2.js" crossOrigin="anonymous"></script>
                </Head>
                <body>
                    {/* onde o next coloca a aplicação */}
                    <Main />
                    {/* scripts do next */}
                    <NextScript />
                </body>
            </Html>
        );
    }
}