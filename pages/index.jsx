import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

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
      
      <div className="sticky bottom-0">
        <Player />
      </div>
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
