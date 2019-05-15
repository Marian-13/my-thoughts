import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import withOneTimeInOutAnimation from 'hocs/withOneTimeInOutAnimation'
import styles from './styles.module.scss'

class Note extends Component {
  static propTypes = {
    className: PropTypes.string,
    renderHeader: PropTypes.func,
    renderBody: PropTypes.func
  }

  render() {
    const { className, renderHeader, renderBody } = this.props

    return (
      <div className={classnames(styles.note, className)}>
        {renderHeader()}
        {renderBody()}
      </div>
    )
  }
}

// export default withOneTimeInOutAnimation(Note)
export default Note
