import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-materialize'

import Button from './Button'

import {
  startRecordingAudio,
  stopRecordingAudio,
  releaseRecordedAudio
} from 'lib/audio/recording/actionCreators'

import {
  getSourceOfMedia,
  getDurationOfMedia
} from 'lib/audio'

import { createAudioNote } from '../actionCreators'

import styles from './styles.module.scss'

const mapStateToProps = state => ({
  isAudioRecording: state.audioRecording.isRecording,
  hasAudioRecord: !!state.audioRecording.fragments.length,
  audioRecordFragments: state.audioRecording.fragments
})

const mapDispatchToProps = {
  startRecordingAudio,
  stopRecordingAudio,
  releaseRecordedAudio,
  createAudioNote
}

class RecordButton extends Component {
  componentDidMount() {
    this.props.releaseRecordedAudio()
  }

  handleStartButtonClick = () => {
    this.props.startRecordingAudio()
  }

  handleStopButtonClick = () => {
    this.props.stopRecordingAudio()
  }

  handleContinueButtonClick = () => {
    this.props.startRecordingAudio()
  }

  handleRemoveButtonClick = () => {
    this.props.releaseRecordedAudio()
  }

  handleSaveButtonClick = () => {
    const { releaseRecordedAudio, audioRecordFragments, createAudioNote } = this.props

    const audioRecordSources = audioRecordFragments.map(getSourceOfMedia)

    Promise.all(audioRecordFragments.map(fragment => getDurationOfMedia(fragment)))
      .then(durations => durations.reduce((sum, duration) => (sum += duration), 0))
      .then(audioRecordDuration => {
        releaseRecordedAudio()

        createAudioNote({ sources: audioRecordSources, duration: audioRecordDuration })
      })
  }

  renderStartButton() {
    return <Button iconType="mic" onClick={this.handleStartButtonClick} />
  }

  renderStopButton() {
    return (
      <Button
        iconClassName="animated flash slower infinite"
        iconType="fiber_manual_record"
        onClick={this.handleStopButtonClick}
      />
    )
  }

  renderContinueButton() {
    return <Button iconType="mic" onClick={this.handleContinueButtonClick} />
  }

  renderRemoveButton() {
    return <Button className={styles.middleButton} iconType="close" onClick={this.handleRemoveButtonClick} />
  }

  renderSaveButton() {
    return <Button iconType="save" onClick={this.handleSaveButtonClick} />
  }

  render() {
    const { isAudioRecording, hasAudioRecord } = this.props

    if (isAudioRecording) return this.renderStopButton()
    if (!hasAudioRecord) return this.renderStartButton()

    return (
      <Row className={styles.buttons}>
        <Col s={4} className={styles.buttonContainer}>
          {this.renderContinueButton()}
        </Col>

        <Col s={4} className={styles.buttonContainer}>
          {this.renderRemoveButton()}
        </Col>

        <Col s={4} className={styles.buttonContainer}>
          {this.renderSaveButton()}
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordButton)
