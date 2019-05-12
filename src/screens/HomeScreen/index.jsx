import React, { Component, Fragment } from 'react'

import Navbar from './Navbar'
import RecordButton from './RecordButton'
import Notes from './Notes'
import Input from './Input'
import Toggler from './Toggler'

import styles from './styles.module.scss'

export default class HomeScreen extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />

        <div className={styles.screenContent}>
          <RecordButton />
          <Notes />
          <Input />
          <Toggler />
        </div>
      </Fragment>
    )
  }
}
