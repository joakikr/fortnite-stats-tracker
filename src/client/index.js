import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import App from './components/App/App'
import reducer from './state/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(promise, thunk)
    )
);

const node = document.getElementById("app");

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), node);