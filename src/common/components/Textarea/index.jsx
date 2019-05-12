import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'
import classnames from 'classnames'

export default class Textarea extends Component {
  static propTypes = {
    ...TextareaAutosize.propTypes,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange = event => {
    this.props.onChange(event.target.value, event)
  }

  render() {
    const { value, className, ...rest } = this.props

    return (
      <TextareaAutosize
        {...rest}
        value={value}
        className={classnames('materialize-textarea', className)}
        onChange={this.handleChange}
      />
    )
  }
}
