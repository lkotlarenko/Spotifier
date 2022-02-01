import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotifier</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      {/* Player */}
    </div>
  )
}

export default Home;