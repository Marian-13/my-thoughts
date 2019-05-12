import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button as MButton, Icon } from 'react-materialize'
import classnames from 'classnames'

import styles from './styles.module.scss'

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    iconType: PropTypes.string,
    onClick: PropTypes.func
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    const { isRecording, className, iconClassName, iconType } = this.props

    return (
      <MButton
        className={classnames(styles.button, className)}
        flat
        large
        waves="red"
        onClick={this.handleClick}
      >
        <Icon className={iconClassName}>{iconType}</Icon>
      </MButton>
    )
  }
}
