import React, { Component } from 'react'
import { connect } from 'react-redux'

import Textarea from 'components/Textarea'
import { isEnter } from 'lib/event'
import { createNote } from 'domain/note'
import { addNote } from '../actionCreators'
import styles from './styles.module.scss'

const mapStateToProps = state => ({ noteType: state.homeScreen.noteType })
const mapDispatchToProps = { addNote }

class Input extends Component {
  state = { text: '' }

  handleChange = text => {
    this.setState({ text })
  }

  handleKeyDown = event => {
    if (!isEnter(event)) return

    event.preventDefault()

    if (!this.state.text) return

    const note = createNote(this.props.noteType, { text: this.state.text })

    this.setState({ text: '' }, () => this.props.addNote(note))
  }

  render() {
    const { text } = this.state

    return (
      <div className={`input-field ${styles.textareaContainer}`}>
        <Textarea
          value={text}
          className={styles.textarea}
          placeholder="Type here..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
