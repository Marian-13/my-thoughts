import { createStore, combineReducers } from 'redux'
import reducersModules from './reducersModules'

const extractReducersFromModules = (reducersModules) => (
  reducersModules.reduce((memo, reducersModule) => ({ ...memo, ...reducersModule }), {})
)

const reducers = extractReducersFromModules(reducersModules)

window.store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
