import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Note from '../Note'
import Title from '../Title'

import commonStyles from '../commonStyles.module.scss'

class Thought extends Component {
  static propTypes = {
    uid: PropTypes.string,
    text: PropTypes.string
  }

  renderNoteHeader = () => {
    return <Title className={commonStyles.thoughtTitle} text="Thought" />
  }

  renderNoteBody = () => {
    return this.props.text
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

export default Thought
