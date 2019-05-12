import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NOTE_TYPES } from 'domain/note'
import Thought from './Thought'
import Task from './Task'
import AudioNote from './AudioNote'
import styles from './styles.module.scss'

const mapStateToProps = state => ({ notes: state.homeScreen.notes })

class Notes extends Component {
  renderNote(note) {
    switch (note.type) {
      case NOTE_TYPES.THOUGHT:
        return <Thought key={note.uid} uid={note.uid} text={note.text} />
      case NOTE_TYPES.TASK:
        return <Task key={note.uid} uid={note.uid} text={note.text} />
      default:
        return null
    }
  }

  render() {
    const { notes } = this.props

    return (
      <div className={styles.notes}>
        {<AudioNote key="2412234asfas" uid="2412234asfas" fileName="halo_on_fire" />}
        {notes.map(note => this.renderNote(note))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Notes)
