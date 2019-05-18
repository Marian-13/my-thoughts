import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, ProgressBar } from 'react-materialize'

import Button from './Button'
import {
  startPlayingAudio,
  pausePlayingAudio,
  stopPlayingAudio,
  releasePlayedAudio
} from 'lib/audio/actionCreators'

import styles from './styles.module.scss'

const mapStateToProps = state => ({
  isAudioPlaying: state.audio.isPlaying,
  isAudioPaused: state.audio.isPlaying
})

const mapDispatchToProps = {
  startPlayingAudio,
  pausePlayingAudio,
  stopPlayingAudio,
  releasePlayedAudio
}

class Player extends Component {
  static propTypes = {
    audioSources: PropTypes.array
  }

  handleStartButtonClick = () => {
    this.props.releasePlayedAudio()
    this.props.startPlayingAudio(this.props.audioSources)
  }

  handlePauseButtonClick = () => {
    this.props.pausePlayingAudio()
  }

  handleResumeButtonClick = () => {
    this.props.resumePlayingAudio()
  }

  handleStopButtonClick = () => {
    this.props.stopPlayingAudio()
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
    const { isAudioPlaying, isAudioPaused } = this.props

    if (isAudioPlaying) return this.renderPauseButton()
    if (isAudioPaused) return this.renderResumeButton()

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
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.position}>0:00</div>

          <ProgressBar className={styles.progress} progress={25} />

          <div className={styles.duration}>0:50</div>
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
