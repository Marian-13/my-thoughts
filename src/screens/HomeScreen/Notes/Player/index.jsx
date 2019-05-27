import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, ProgressBar } from 'react-materialize'

import Button from './Button'
import {
  startPlayingAudioTrack,
  pausePlayingAudioTrack,
  resumePlayingAudioTrack,
  stopPlayingAudioTrack,
  releasePlayedAudioTrack
} from 'lib/audio/playing/actionCreators'
import { secondsToPlayerFormat } from 'lib/formatters'

import styles from './styles.module.scss'

const mapStateToProps = (state, ownProps) => {
  const { uid } = ownProps
  const entry = state.audioPlaying.entries[uid]

  if (!entry) return {}

  return {
    isPlaying: entry.isPlaying,
    isPaused: entry.isPaused,
    isStopped: entry.isStopped,
    isFinished: entry.isFinished,
    position: entry.position
  }
}

const mapDispatchToProps = {
  startPlayingAudioTrack,
  pausePlayingAudioTrack,
  resumePlayingAudioTrack,
  stopPlayingAudioTrack,
  releasePlayedAudioTrack
}

class Player extends Component {
  static propTypes = {
    uid: PropTypes.string,
    sources: PropTypes.array,
    duration: PropTypes.number
  }

  handleStartButtonClick = () => {
    const { uid, sources, startPlayingAudioTrack } = this.props

    startPlayingAudioTrack(uid, sources)
  }

  handlePauseButtonClick = () => {
    this.props.pausePlayingAudioTrack(this.props.uid)
  }

  handleResumeButtonClick = () => {
    this.props.resumePlayingAudioTrack(this.props.uid)
  }

  handleStopButtonClick = () => {
    this.props.stopPlayingAudioTrack(this.props.uid)
  }

  renderStartButton() {
    return (
      <Button onClick={this.handleStartButtonClick}>
        <Icon>{'play_arrow'}</Icon>
      </Button>
    )
  }

  renderPauseButton() {
    return (
      <Button onClick={this.handlePauseButtonClick}>
        <Icon>{'pause'}</Icon>
      </Button>
    )
  }

  renderResumeButton() {
    return (
      <Button onClick={this.handleResumeButtonClick}>
        <Icon>{'play_arrow'}</Icon>
      </Button>
    )
  }

  renderChangeButton = () => {
    const { isPlaying, isPaused } = this.props

    if (isPlaying) return this.renderPauseButton()
    if (isPaused) return this.renderResumeButton()

    return this.renderStartButton()
  }

  renderStopButton = () => {
    return (
      <Button className={styles.stopButton} onClick={this.handleStopButtonClick}>
        <Icon>{'stop'}</Icon>
      </Button>
    )
  }

  render() {
    const { position, duration } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.position}>{secondsToPlayerFormat(position)}</div>

          <ProgressBar className={styles.progress} progress={25} />

          <div className={styles.duration}>{secondsToPlayerFormat(duration)}</div>
        </div>

        <div className={styles.actions}>
          {this.renderChangeButton()}
          {this.renderStopButton()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
