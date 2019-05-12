import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import M from 'materialize-css'

import withHidingOnKeyboardShow from 'hocs/withHidingOnKeyboardShow'
import { DEFAULT_NOTE_TYPE, NOTE_TYPES } from 'domain/note'
import { changeNoteType } from '../actionCreators'
import styles from './styles.module.scss'

const options= [
  { id: NOTE_TYPES.THOUGHT, text: 'Thoughts', default: true },
  { id: NOTE_TYPES.TASK, text: 'Tasks' }
]

const mapDispatchToProps = { changeNoteType }

class Toggler extends Component {
  static propTypes = { style: PropTypes.object }

  state = { noteType: DEFAULT_NOTE_TYPE }

  ref = createRef()

  componentDidMount() {
    M.Tabs.init(this.ref.current, {
      onShow: (element) => {
        this.setState({ noteType: element.id }, () => this.props.changeNoteType(this.state.noteType))
      }
    })
  }

  render() {
    const { style } = this.props

    return (
      <React.Fragment>
        <ul ref={this.ref} className={classnames('tabs', 'tabs-fixed-width', styles.toggler)} style={style}>
          {options.map((option, index) => (
            <li key={index} className={classnames('tab', { active: option.default })}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href={`#${option.id}`}>{option.text}</a>
            </li>
          ))}
        </ul>

        {/* TODO data-note-type insead of id */}
        {/* HACK for firing onShow callback */}
        {options.map((option, index) => <div id={option.id} key={option.id}></div>)}
      </React.Fragment>
    )
  }
}

export default withHidingOnKeyboardShow(connect(null, mapDispatchToProps)(Toggler))
