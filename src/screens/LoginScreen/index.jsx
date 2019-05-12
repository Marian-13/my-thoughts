import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, TextInput } from 'react-materialize'

import { redirectTo } from '../../lib/path'
import logo from '../../images/logo.png'
import styles from './styles.module.scss'

export default class LoginScreen extends Component {
  handleClick = () => {
    redirectTo('/')
  }

  render() {
    return (
      <Row>
        <Col s={12}>
          <div className={styles.imageContainer}>
            <img src={logo} width="50px" alt="Logo" />
          </div>

          <h5 className="center-align">
            Sing in to <i>My Thoughts</i>
          </h5>

          <TextInput s={12} email label="Email" />
          <TextInput s={12} password label="Password" />

          <div className={styles.signInButtonContainer}>
            <Button className={styles.signInButton} waves="light" onClick={this.handleClick}>Sign In</Button>
          </div>

          <div className={styles.forgotPasswordLinkContainer}>
            <Link to="/forgot_password">Forgot password?</Link>
          </div>

          <div className={styles.registerLinkContainer}>
            <Link to="/register">Don't have an account yet? Register!</Link>
          </div>
        </Col>
      </Row>
    )
  }
}
