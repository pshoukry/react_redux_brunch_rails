import 'babel-polyfill'
require('es6-promise').polyfill()
import React from 'react'
import { render  } from 'react-dom'
import { Router, browserHistory, Redirect } from 'react-router'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider  } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore, routerReducer  } from 'react-router-redux'
import routes from './routes'
import * as actions from './actions'
import * as reducers from './reducers'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const history = syncHistoryWithStore(browserHistory, store)


document.addEventListener('DOMContentLoaded', () => {
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
});
