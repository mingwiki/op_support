import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Toolkits Server</title>
        <meta name="description" content="powered by Fu Ming (mingwiki)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Toolkits Server is running...
        </h1>
      </main>
    </div>
  )
}
