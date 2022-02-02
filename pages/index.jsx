import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'

const Home = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
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

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
