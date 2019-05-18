import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import reducersModules from './reducersModules'

const extractReducersFromModules = reducersModules => (
  reducersModules.reduce((memo, reducersModule) => ({ ...memo, ...reducersModule }), {})
)

const reducers = extractReducersFromModules(reducersModules)
const combinedReducers = combineReducers(reducers)

const middlewares = [logger]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)

window.store = createStore(combinedReducers, undefined, composedEnhancers)
