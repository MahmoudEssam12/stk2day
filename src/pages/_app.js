import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import '../styles/globals.css'
import { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"
import store from "../store/store";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next"
import PrimeReact from "primereact/api";

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true)
    };
    const handleComplete = (url) => {
      setLoading(false)
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && (
    <motion.div exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="loader-wrapper">
      <div className="loading-logo">
        <picture>
          <img src="/images/logo.png" alt="stk2day - ستوك تو داي" />
        </picture>
      </div>
    </motion.div>
  )
}

function MyApp({ Component, pageProps }) {
  PrimeReact.ripple = true;

  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter();
  const dir = router.locale === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <Loading />
      </AnimatePresence>
      {
        getLayout(
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        )
      }
    </Provider >


  )
}

export default appWithTranslation(MyApp)
