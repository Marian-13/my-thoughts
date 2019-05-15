import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Note from '../Note'
import styles from './styles.module.scss'

class Task extends Component {
  static propTypes = {
    uid: PropTypes.string,
    text: PropTypes.string
  }

  render() {
    const { text } = this.props

    return (
      <Note
        className={styles.urgentTask}
        renderHeader={() => <div className={styles.title}>{"Urgent Task"}</div>}
        renderBody={() => text}
      />
    )
  }
}

export default Task
