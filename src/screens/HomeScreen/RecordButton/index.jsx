import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-materialize'
import classnames from 'classnames'
import last from 'lodash/last'

import AudioNote from '../Notes/AudioNote'

import Button from './Button'
import { startAudioRecording, stopAudioRecording, saveAudio } from 'lib/audio/actionCreators'

import {
  createAudioFile,
  startRecordingToAudioFile,
  stopRecordingToAudioFile,
  releaseAudioFile
} from 'lib/audio'

import styles from './styles.module.scss'

// const mapStateToProps = state => ({ isRecording: state.audio.isRecording })
// const mapDispatchToProps = { startAudioRecording, stopAudioRecording }

class RecordButton extends Component {
  state = { hasRecordings: false, isRecording: false }

  audioFiles = []

  componentWillUnmount() {
    this.audioFiles.forEach(releaseAudioFile)
  }

  handleStartButtonClick = async () => {
    const audioFile = createAudioFile()

    this.audioFiles.push(audioFile)

    this.setState({ hasRecordings: true, isRecording: true }, () => startRecordingToAudioFile(audioFile))
  }

  handleStopButtonClick = () => {
    this.setState({ isRecording: false }, () => stopRecordingToAudioFile(last(this.audioFiles)))
  }

  handleContinueButtonClick = () => {
    const audioFile = createAudioFile()

    this.audioFiles.push(audioFile)

    this.setState({ isRecording: true }, () => startRecordingToAudioFile(audioFile))
  }

  handleRemoveButtonClick = () => {
    this.audioFiles.forEach(releaseAudioFile)
    this.audioFiles = []

    this.setState({ hasRecordings: false })
  }

  handleSaveButtonClick = () => {
    this.audioFiles.forEach(releaseAudioFile)
    this.audioFiles = []

    this.setState({ hasRecordings: false })
  }

  renderStartButton() {
    // return <Button iconType="mic" onClick={this.handleStartButtonClick} />

    return (
      <React.Fragment>
        <Button iconType="mic" onClick={this.handleStartButtonClick} />

        {this.audioFiles.map(audioFile => (
          <AudioNote key={audioFile.src} uid={audioFile.src} audioFile={audioFile} />
        ))}
      </React.Fragment>
    )
  }

  renderStopButton() {
    // return (
    //   <Button
    //     iconClassName="animated flash slower infinite"
    //     iconType="fiber_manual_record"
    //     onClick={this.handleStopButtonClick}
    //   />
    // )

    return (
      <React.Fragment>
        <Button
          iconClassName="animated flash slower infinite"
          iconType="fiber_manual_record"
          onClick={this.handleStopButtonClick}
        />

        {this.audioFiles.map(audioFile => (
          <AudioNote key={audioFile.src} uid={audioFile.src} audioFile={audioFile} />
        ))}
      </React.Fragment>
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
    const { isRecording, hasRecordings } = this.state

    if (isRecording) return this.renderStopButton()
    if (!hasRecordings) return this.renderStartButton()

    return (
      <React.Fragment >
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

        {this.audioFiles.map(audioFile => (
          <AudioNote key={audioFile.src} uid={audioFile.src} audioFile={audioFile} />
        ))}
      </React.Fragment>
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(RecordButton)
export default RecordButton
