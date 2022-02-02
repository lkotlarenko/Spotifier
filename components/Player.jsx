import { ReplyIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { PauseIcon, PlayIcon, RewindIcon, FastForwardIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(70)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  const handlePlayPause = () => {
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
          if (data.body.is_playing) {
              spotifyApi.pause();
              setIsPlaying(false);
          } else {
              spotifyApi.play();
              setIsPlaying(true);
          }
      })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(70)
    }
  }, [currentTrackIdState, spotifyApi, session])

  return (
    <div
        className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
    >
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
        />
        <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="player-btn"/>
          <RewindIcon
            className="player-btn"
            onClick={() => spotifyApi.skipToPrevious()}
          />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="h-10 w-10 player-btn" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="h-10 w-10 player-btn" />
          )}

          <FastForwardIcon
            className="player-btn"
            onClick={() => spotifyApi.skipToNext()}
          />
          <ReplyIcon className="player-btn" />
      </div>
    </div>
  )
}

export default Player
