import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Note from '../Note'
import styles from './styles.module.scss'

export default class Thought extends Component {
  static propTypes = {
    uid: PropTypes.string,
    text: PropTypes.string
  }

  render() {
    const { text } = this.props

    return (
      <Note
        className={styles.thought}
        titleClassName={styles.title}
        titleText="Thought"
        text={text}
      />
    )
  }
}
