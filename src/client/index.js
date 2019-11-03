import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import loading from './state/middleware';
import ls from 'local-storage';

import { LOCAL_STORAGE } from './consts';
import App from './components/App/App'
import reducer, { initialState } from './state/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const state = initialState();
const savedProfiles = ls(LOCAL_STORAGE.SAVED_PROFILES);
const darkMode = ls('fst-dark-mode');

if (savedProfiles) {
    // Just assume its correct #YOLO
    state.profiles = JSON.parse(savedProfiles)
}

if (darkMode) {
    state.isDarkMode = true;
}


const store = createStore(
    reducer,
    state,
    composeEnhancers(
        applyMiddleware(promise, thunk, loading())
    )
);

const node = document.getElementById("app");

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), node);