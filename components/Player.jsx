import { ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { PauseIcon, PlayIcon, RewindIcon, FastForwardIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
      debounce((volume) => {
          spotifyApi.setVolume(volume).catch((err) => {console.error(err)})
      }, 500),
      []
  )

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

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon
            className="player-btn"
            onClick={() => volume > 0 && setVolume(volume - 10)}
          />
          <input
            className="w-14 md:w-28"
            type="range"
            value={volume}
            min={0}
            max={100}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <VolumeUpIcon
            className="player-btn"
            onClick={() => volume < 100 && setVolume(volume + 10)}
          />
      </div>
    </div>
  )
}

export default Player
