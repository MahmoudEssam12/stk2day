import Document, { Html, Head, Main, NextScript } from 'next/document'

async function getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" }
}
// handle the language list links to navigate between the two languages

export default function MyDocument(props) {

    return (
        <Html dir={props.locale === "en" ? "ltr" : props.locale === "ar" ? "rtl" : ""}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}