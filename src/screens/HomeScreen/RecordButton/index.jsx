import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-materialize'
import classnames from 'classnames'

import Button from './Button'
import { startAudioRecording, stopAudioRecording } from 'lib/audio/actionCreators'
// import { createAudio } from 'lib/audio'
// import { createFile } from 'lib/file'

import styles from './styles.module.scss'

const mapStateToProps = state => ({ isRecording: state.audio.isRecording })
const mapDispatchToProps = { startAudioRecording, stopAudioRecording }

class RecordButton extends Component {
  state = { audio: null }

  handleStartButtonClick = async () => {
    // const file = await createFile('hello.mp3')
    //
    // console.log(file.fullPath);
    //
    // const audio = createAudio('hello.mp3')
    //
    // audio.startRecord()

    // this.setState({ audio }, () => this.props.startAudioRecording())
  }

  handleStopButtonClick = () => {
    // this.props.stopAudioRecording()
    // // this.state.audio.stopRecord()
    // this.state.audio.stop()
  }

  handleContinueButtonClick = () => {
    // this.props.startAudioRecording()
    // // this.state.audio.startRecord()
    // this.state.audio.stop()
  }

  handleRemoveButtonClick = () => {

  }

  handleSaveButtonClick = () => {

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
    const { isRecording } = this.props
    const { audio } = this.state

    if (isRecording) return this.renderStopButton()
    if (!audio) return this.renderStartButton()

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
// export default RecordButton
