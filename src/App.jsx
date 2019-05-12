import 'global/fonts'
import 'global/stylesheets.scss'
import 'global/javascripts'

import 'initializers/store'
import 'initializers/keyboard'
import 'initializers/backgroundImage'
import 'initializers/screenOrientation'

import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'

import HomeScreen from 'screens/HomeScreen'

const App = () => (
  <Provider store={window.store}>
    <HashRouter>
      <Route component={HomeScreen} />
    </HashRouter>
  </Provider>
)

export default App
