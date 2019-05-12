import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button, Icon } from 'react-materialize'
import { getAudioFile } from 'lib/audio'

import styles from './styles.module.scss'

class AudioNote extends Component {
  static propTypes = {
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    titleText: PropTypes.string,
    fileName: PropTypes.string
  }

  state = { isPlaying: false }

  async componentDidMount() {
    this.audio = getAudioFile(this.props.fileName)
  }

  handlePlayButtonClick = async () => {
    this.setState({ isPlaying: true }, () => this.audio.play())

    // this.audio = await getAudioFile(this.props.fileName)
    //
    // this.setState({ isPlaying: true }, () => this.audio.play())

    // console.log('Promise');
    // console.log(getAudioFile(this.props.fileName))
    //
    // getAudioFile(this.props.fileName).then(audio => {
    //   console.log('Then');
    //   this.audio = audio
    //
    //   this.setState({ isPlaying: true }, () => this.audio.play())
    // }).catch(error => {
    //   console.log('Catch Error');
    //   console.log(error)
    //   console.log(error.code)
    // })
  }

  handlePauseButtonClick = async () => {
    this.setState({ isPlaying: false }, () => this.audio.pause())
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
