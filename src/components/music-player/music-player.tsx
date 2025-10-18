'use client'

import React from 'react'
import './music-player.css' // Import the CSS file
import { Button, Select, Option } from '../material-tailwind-components'

interface IProps {} // eslint-disable-line @typescript-eslint/no-empty-object-type

interface IState {
  volume: number
}

type MyButtonProps = {
  id: string
  onClick: () => void
  label: string
}

function MyButton({ id, onClick, label }: MyButtonProps) {
  return (
    <Button
      id={id}
      onClick={onClick}
      size="sm"
      variant="outlined"
      className={`
            flex items-center px-2 py-1
            bg-neutral-0
            border border-gray-300 hover:border-gray-500
            hover:bg-neutral-100  light:text-neutral-900 dark:hover:bg-neutral-700
            cursor-pointer
          `}
    >
      <span className="inline-block align-text-middle">{label}</span>
    </Button>
  )
}

export class MusicPlayer extends React.Component<IProps, IState> {
  selectedSongName: string = 'avalanche'
  allSongNames = [
    'avalanche',
    'chess',
    'fight-cub',
    'orbital-launch',
    'sketch-ball',
    'wheely',
    'boating-school',
    'cube-dance',
    'grove-tender',
    'rail-layer',
    'space-quest',
  ]

  currentOggPlayer: any = null // eslint-disable-line @typescript-eslint/no-explicit-any
  allOggPlayers: Record<string, any> = {} // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor(props: IProps) {
    super(props)
    this.state = {
      volume: 0.5,
    }
    this.handleSliderChange = this.handleSliderChange.bind(this)
  }

  // called when slider is moved
  handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseFloat(event.target.value)
    const safeVolume = Number.isFinite(newVolume) ? newVolume : 0
    this.setState({ volume: safeVolume }, () => {
      this.updateVolume()
    })
  }

  updateVolume() {
    window.MusicManager().outNode.gain.value = this.state.volume * 5 // set volume for lofi
    if (this.currentOggPlayer) {
      this.currentOggPlayer.volume = this.state.volume
    }
  }

  // stop current lofi or ogg song
  stopClicked() {
    window.MusicManager().stopMusic() // stop lofi
    for (const audio of Object.values(this.allOggPlayers)) {
      audio.pause()
    }
  }

  playLofiClicked() {
    const songData = window.SONGS[this.selectedSongName]

    for (const audio of Object.values(this.allOggPlayers)) {
      audio.pause()
    }
    window.MusicManager().stopMusic()
    window.MusicManager().startMusicLoop(songData)

    this.updateVolume()
  }

  playOggClicked() {
    const songKey = this.selectedSongName

    window.MusicManager().stopMusic() // stop lofi

    for (const [key, audio] of Object.entries(this.allOggPlayers)) {
      if (key !== songKey) {
        audio.pause()
      }
    }

    if (!this.allOggPlayers[songKey]) {
      // load song for first time
      this.currentOggPlayer = new Audio(`/oggs/${songKey}.ogg`)
      // oggPlayer.addEventListener('canplaythrough', () => oggPlayer.play());
      this.allOggPlayers[songKey] = this.currentOggPlayer
    }
    else {
      // song previously loaded
      this.currentOggPlayer = this.allOggPlayers[songKey]
    }

    this.startOggPlayer()
    this.updateVolume()
  }

  startOggPlayer() {
    // play ogg from beginning ASAP
    const audio = this.currentOggPlayer
    audio.currentTime = 0
    // audio.load()

    console.log('play A')
    audio.play().catch(() => {
      audio.addEventListener('canplaythrough', () => {
        console.log('play B')
        audio.play()
      }, { once: true })
    })
  }

  render() {
    return (
      <div id="music-player">
        <span id="song-player-label" className="hidden-on-small-screen">Song Player</span>

        <div className="w-72">
          <Select
            variant="outlined"
            label="Select Song"
            id="select-song"
            value={this.selectedSongName}
            onChange={(e) => {
              if (e) this.selectedSongName = e
              this.forceUpdate()
            }}
          >
            <Option value="avalanche">avalanche</Option>
            <Option value="chess">chess</Option>
            <Option value="fight-cub">fight-cub</Option>
            <Option value="orbital-launch">orbital-launch</Option>
            <Option value="sketch-ball">sketch-ball</Option>
            <Option value="wheely">wheely</Option>
            <Option value="boating-school">boating-school</Option>
            <Option value="cube-dance">cube-dance</Option>
            <Option value="grove-tender">grove-tender</Option>
            <Option value="rail-layer">rail-layer</Option>
            <Option value="space-quest">space-quest</Option>
          </Select>
        </div>

        <MyButton id="play" onClick={() => this.playLofiClicked()} label="Play A" />
        <MyButton id="playOgg" onClick={() => this.playOggClicked()} label="Play B" />
        <MyButton id="stop" onClick={() => this.stopClicked()} label="Stop" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          className="slider"
          id="musicVolumeSlider"
          value={this.state.volume}
          onChange={this.handleSliderChange}
        />
      </div>
    )
  }
}
