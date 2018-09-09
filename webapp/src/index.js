import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise-middleware';

import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxPromise(), thunk, logger)
    )
);

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Provider store={store}>
                <App></App>
            </Provider>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

//registerServiceWorker();