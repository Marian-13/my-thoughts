import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NOTE_TYPES, NOTE_SUBTYPES } from 'domain/note'
import Thought from './Thought'
import Task from './Task'
import AudioThought from './AudioThought'
import AudioTask from './AudioTask'
import styles from './styles.module.scss'

const mapStateToProps = state => ({ notes: state.homeScreen.notes })

class Notes extends Component {
  renderNote(note) {
    switch (note.type) {
      case NOTE_TYPES.THOUGHT:
        return this.renderThougth(note)
      case NOTE_TYPES.TASK:
        return this.renderTask(note)
      default:
        return null
    }
  }

  renderThougth(note) {
    switch (note.subtype) {
      case NOTE_SUBTYPES.TEXT:
        return this.renderTextThought(note)
      case NOTE_SUBTYPES.AUDIO:
        return this.renderAudioThought(note)
      default:
        return null
    }
  }

  renderTask(note) {
    switch (note.subtype) {
      case NOTE_SUBTYPES.TEXT:
        return this.renderTextTask(note)
      case NOTE_SUBTYPES.AUDIO:
        return this.renderAudioTask(note)
      default:
        return null
    }
  }

  renderTextThought(note) {
    return <Thought key={note.uid} uid={note.uid} text={note.text} />
  }

  renderAudioThought(note) {
    return <AudioThought key={note.uid} uid={note.uid} sources={note.sources} />
  }

  renderTextTask(note) {
    return <Task key={note.uid} uid={note.uid} text={note.text} />
  }

  renderAudioTask(note) {
    return <AudioTask key={note.uid} uid={note.uid} sources={note.sources} />
  }

  render() {
    const { notes } = this.props

    return (
      <div className={styles.notes}>
        {notes.map(note => this.renderNote(note))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Notes)
