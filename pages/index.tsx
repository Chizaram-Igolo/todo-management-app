import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import ItemList from "./items";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo</h1>

        <ItemList />
      </main>

      <footer className={styles.footer}>Todo Management App &copy;2021</footer>
    </div>
  );
};

// Retrieve Todo Items
// export async function getServerSideProps() {
//   const res = await fetch("/utils/fake-data.ts");
//   const data = await res.json();

//   console.log(data);

//   return { props: { data } };
// }

export default Home;
