import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import reducers from './reducers'
import App from './components/App';

const stripePromise = loadStripe('pk_test_jGTlC77uWQmsUBvLGz0FwD7n00ObGlFWRz')

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(<Elements stripe={stripePromise}>
                  <Provider store={store}>
                    <App />
                  </Provider>
                </Elements>,
document.getElementById('root'));
