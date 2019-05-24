import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, ProgressBar } from 'react-materialize'

import Button from './Button'
import {
  startPlayingAudioRecord,
  pausePlayingAudioRecord,
  resumePlayingAudioRecord,
  stopPlayingAudioRecord,
  releasePlayedAudioRecord
} from 'lib/audio/playing/actionCreators'

import styles from './styles.module.scss'

const mapStateToProps = state => ({
  isAudioRecordPlaying: state.audioPlaying.isPlaying,
  isAudioRecordPaused: state.audioPlaying.isPaused,
  isAudioRecordStopped: state.audioPlaying.isStopped,
  isAudioRecordFinished: state.audioPlaying.isFinished,
  audioRecordPosition: state.audioPlaying.position,
  audioRecordDuration: state.audioPlaying.duration
})

const mapDispatchToProps = {
  startPlayingAudioRecord,
  pausePlayingAudioRecord,
  resumePlayingAudioRecord,
  stopPlayingAudioRecord,
  releasePlayedAudioRecord
}

class Player extends Component {
  static propTypes = {
    audioSources: PropTypes.array
  }

  handleStartButtonClick = () => {
    this.props.startPlayingAudioRecord(this.props.audioSources)
  }

  handlePauseButtonClick = () => {
    this.props.pausePlayingAudioRecord()
  }

  handleResumeButtonClick = () => {
    this.props.resumePlayingAudioRecord()
  }

  handleStopButtonClick = () => {
    this.props.stopPlayingAudioRecord()
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
    const { isAudioRecordPlaying, isAudioRecordPaused } = this.props

    if (isAudioRecordPlaying) return this.renderPauseButton()
    if (isAudioRecordPaused) return this.renderResumeButton()

    return this.renderStartButton()
  }

  renderStopButton = () => {
    return (
      <Button className={styles.stopButton} onClick={this.handleStopButtonClick}>
        <Icon>{'stop'}</Icon>
      </Button>
    )
  }

  formatTime(seconds) {
    // TODO Convert to time
    return seconds.toString().replace('.', ':').slice(0, 4)
  }

  render() {
    const { audioRecordPosition, audioRecordDuration } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.position}>{this.formatTime(audioRecordPosition)}</div>

          <ProgressBar className={styles.progress} progress={25} />

          <div className={styles.duration}>{this.formatTime(audioRecordDuration)}</div>
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
