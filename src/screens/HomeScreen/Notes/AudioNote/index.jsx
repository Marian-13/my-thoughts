import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button, Icon } from 'react-materialize'
import { startPlayingAudioFile, pausePlayingAudioFile } from 'lib/audio'

import styles from './styles.module.scss'

class AudioNote extends Component {
  static propTypes = {
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    titleText: PropTypes.string,
    fileName: PropTypes.string,
    audioFile: PropTypes.object
  }

  state = { isPlaying: false }

  // audioFile = new window.Media(
  //   this.props.fileName,
  //   () => console.log('Success'),
  //   error => { console.log('Error'); console.log(error) },
  //   status => { console.log('Status'); console.log(status) }
  // )

  handlePlayButtonClick = async () => {
    this.setState({ isPlaying: true }, () => startPlayingAudioFile(this.props.audioFile))
  }

  handlePauseButtonClick = async () => {
    this.setState({ isPlaying: false }, () => pausePlayingAudioFile(this.props.audioFile))
  }

  renderPlayButton() {
    return (
      <Button waves="red" onClick={this.handlePlayButtonClick}>
        <Icon>play_arrow</Icon>
      </Button>
    )
  }

  renderPauseButton() {
    return (
      <Button waves="red" onClick={this.handlePauseButtonClick}>
        <Icon>pause</Icon>
      </Button>
    )
  }

  render() {
    const { className, titleClassName, titleText, text } = this.props
    const { isPlaying } = this.state

    return (
      <div className={classnames(styles.note, className)}>
        <div className={classnames(styles.title, titleClassName)}>
          {titleText}
        </div>
        {isPlaying ? this.renderPauseButton() : this.renderPlayButton()}
      </div>
    )
  }
}

export default AudioNote
