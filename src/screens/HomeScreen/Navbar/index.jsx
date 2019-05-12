import React, { Component } from 'react'
import { Navbar as MNavbar, NavItem } from 'react-materialize'

import styles from './styles.module.scss'

export default class Navbar extends Component {
  render() {
    return (
      <MNavbar alignLinks="right" className={styles.navbar}>
        <NavItem>
          Getting started
        </NavItem>
        <NavItem>
          Components
        </NavItem>
      </MNavbar>
    )
  }
}
