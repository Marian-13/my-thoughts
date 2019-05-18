import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Note from '../Note'
import Title from '../Title'
import Player from '../Player'

import commonStyles from '../commonStyles.module.scss'

class AudioTask extends Component {
  static propTypes = {
    uid: PropTypes.string,
    sources: PropTypes.array
  }

  renderNoteHeader = () => {
    return <Title className={commonStyles.thoughtTitle} text="Urgent Audio Task" />
  }

  renderNoteBody = () => {
    return <Player audioSources={this.props.sources} />
  }

  render() {
    return (
      <Note
        className={commonStyles.thought}
        renderHeader={this.renderNoteHeader}
        renderBody={this.renderNoteBody}
      />
    )
  }
}

export default AudioTask
