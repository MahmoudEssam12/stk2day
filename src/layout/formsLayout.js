import React from 'react'
import Link from 'next/link'
import styles from "../styles/formsLayout.module.scss";
import { motion } from "framer-motion";
import Head from 'next/head';
import { useRouter } from 'next/router';

function FormsLayout({ children, en = "", ar = "" }) {
    const router = useRouter();

    return (
        <div className={styles.forms_wrapper}>
            <Head>
                <title>
                    {router.locale === "en" ? `Stk2day - ${en}` : `${ar} - ستوك تو داي `}

                </title>
            </Head>
            <div className={styles.col}>
                {children}
            </div>
            <motion.div className={styles.col}>
                <Link href="/">
                    <motion.div exit={{ opacity: 0, x: -100 }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} >
                        <picture style={{ cursor: "pointer" }}>
                            <img src="/images/logo-large.png" alt="" className="logo" />
                        </picture>
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    )
}

export default FormsLayout