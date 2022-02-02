import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'

const colors = [
  'from-green-500',
  'from-blue-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
  'from-indigo-500',
  'from-orange-500',
  'from-teal-500',
]

const Center = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt="Spotify Avatar"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} padding-8 h-80 text-white`}
      >
        <h1>Playlist</h1>
      </section>
    </div>
  )
}

export default Center
