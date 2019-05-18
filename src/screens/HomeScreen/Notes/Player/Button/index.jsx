import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button as MButton } from 'react-materialize'
import classnames from 'classnames'

import styles from './styles.module.scss'

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.object
  }

  static defaultProps = {
    onClick: () => {}
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    const { className, children } = this.props

    return (
      <MButton
        className={classnames(styles.button, className)}
        flat
        waves="red"
        onClick={this.handleClick}
      >
        {children}
      </MButton>
    )
  }
}

export default Button
