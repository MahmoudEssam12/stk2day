import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const MainLayout = ({ children, en = "", ar = "" }) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>
          {router.locale === "en" ? `Stk2day - ${en}` : `${ar} - ستوك تو داي `}

        </title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
