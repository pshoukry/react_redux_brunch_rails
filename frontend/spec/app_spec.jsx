import React from 'react';
import App from '../app/components/App';
import { Provider  } from 'react-redux';
import * as reducers from '../app/reducers';
import { createStore, applyMiddleware, combineReducers  } from 'redux';
var ReactTestUtils = require('react-addons-test-utils');
import thunk from 'redux-thunk';

const reducer = combineReducers({
  ...reducers
})


const store = createStore(reducer, applyMiddleware(thunk))

describe("A suite is just a function", function() {
  it('changes the text after click', function () {
    var app = ReactTestUtils.renderIntoDocument(

      <Provider store={store}>
        <App />
      </Provider>
    )
  })
})
