import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.module.scss'

class Title extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string
  }

  render() {
    const { className, text } = this.props

    return <div className={classnames(styles.title, className)}>{text}</div>
  }
}

export default Title
