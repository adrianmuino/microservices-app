import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

function Home({ data }) {
  return (
    <>
      <Head>
        <title>HomeRun App</title>
        <meta name="description" content="Example microservices app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to HomeRun - Name: {data.name}, Age: {data.age}
        </h1>
      </main>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external APIs
  const res = await fetch('https://api.agify.io?name=Test');
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data }};
}

export default Home;
