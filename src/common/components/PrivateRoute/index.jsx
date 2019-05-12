import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { isUserLoggedIn } from 'lib/auth'

const PrivateRoute = props => (
  isUserLoggedIn() ? <Route {...props} /> : <Redirect to={{ pathname: '/login' }} />
)
