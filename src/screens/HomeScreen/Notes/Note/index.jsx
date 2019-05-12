import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import withOneTimeInOutAnimation from 'hocs/withOneTimeInOutAnimation'
import styles from './styles.module.scss'

class Note extends Component {
  static propTypes = {
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    titleText: PropTypes.string,
    text: PropTypes.string
  }

  render() {
    const { className, titleClassName, titleText, text } = this.props

    return (
      <div className={classnames(styles.note, className)}>
        <div className={classnames(styles.title, titleClassName)}>
          {titleText}
        </div>
        {text}
      </div>
    )
  }
}

export default withOneTimeInOutAnimation(Note)
