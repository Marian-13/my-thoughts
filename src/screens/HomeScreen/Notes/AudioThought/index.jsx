import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, ProgressBar } from 'react-materialize'

import Note from '../Note'
import Button from './Button'
import Spinner from './Spinner'
import styles from './styles.module.scss'

class AudioThought extends Component {
  static propTypes = {
    uid: PropTypes.string,
    isDownloaded: PropTypes.bool
  }

  state = { isAudioDownloaded: this.props.isDownloaded, isAudioLoading: false, isAudioPlaying: false }

  handleDownloadButtonClick = () => {
    this.setState({ isAudioLoading: true })

    setTimeout(() => this.setState({ isAudioDownloaded: true, isAudioLoading: false }), 3000)
  }

  handlePlayButtonClick = () => {
    this.setState({ isAudioPlaying: true })
  }

  handlePauseButtonClick = () => {
    this.setState({ isAudioPlaying: false })
  }

  handleStopButtonClick = () => {

  }

  renderDownloadButtton() {
    return (
      <Button onClick={this.handleDownloadButtonClick}>
        <Icon>{'file_download'}</Icon>
      </Button>
    )
  }

  renderLoadingButton() {
    return (
      <Button>
        <Spinner />
      </Button>
    )
  }

  renderPlayButton() {
    return (
      <Button onClick={this.handlePlayButtonClick}>
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

  renderChangeButton = () => {
    const { isAudioDownloaded, isAudioLoading, isAudioPlaying } = this.state

    if (isAudioLoading) return this.renderLoadingButton()
    if (!isAudioDownloaded) return this.renderDownloadButtton()
    if (isAudioPlaying) return this.renderPauseButton()

    return this.renderPlayButton()
  }

  renderStopButton = () => {
    return (
      <Button className={styles.stopButton} onClick={this.handleStopButtonClick}>
        <Icon>{'stop'}</Icon>
      </Button>
    )
  }

  renderNoteBody = () => {
    return (
      <div className={styles.container}>
        {this.renderChangeButton()}
        {this.renderStopButton()}

        <div className={styles.progress}>
          0:00 / 0:50
          <ProgressBar className={styles.progressBar} progress={0} />
        </div>
      </div>
    )
  }

  render() {
    const { text } = this.props

    return (
      <Note
        className={styles.thought}
        renderHeader={() => <div className={styles.title}>{"Audio Thought"}</div>}
        renderBody={this.renderNoteBody}
      />
    )
  }
}

export default AudioThought
