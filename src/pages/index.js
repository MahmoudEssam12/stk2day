import Head from 'next/head'
import HomeContent from "../components/Home/HomeContent";
import { MainLayout } from "../layout/mainLayout";
import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router';

// import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navbar", "headerText", "footer", "home", "common"])),
    },
  };
}
export default function Home() {
  // const {t} = useTranslation();
  const router = useRouter()
  return (
    <motion.div
      exit={{ opacity: 0, y: 20 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    >
      <Head>
        <title>
          {router.locale === "en" ? `Stk2day` : `ستوك تو داي `}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent />
    </motion.div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout >
      {page}
    </MainLayout>
  )
}
