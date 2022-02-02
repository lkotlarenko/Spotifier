import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Track from './Track'

const Songs = () => {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="pb-28 flex flex-col px-8 space-y-1 text-white">
        {playlist?.tracks.items.map((track, i) => (
            <Track key={track.track.id} track={track} order={i} />
        ))}
    </div>
  )
}

export default Songs
