'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';

import {IndexRedirect, Router, Route, Link, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'

import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {reducer as formReducer} from 'redux-form';

import SecurityReducer from './reducer/SecurityReducer';

import MyProjectContainer from './component/MyProjectContainer';
import Dashboard from './component/Dashboard';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

if (process.env.NODE_ENV !== 'production') {
    React.Perf = require('react-addons-perf');
}

const reducers = combineReducers({
    security: SecurityReducer,

    routing: routerReducer,
    form: formReducer
});

const loggerMiddleware = createLogger({level: "debug", collapsed: true});

const historyNavigationType = hashHistory;
const routerMiddlewareInstance = routerMiddleware(historyNavigationType);

const store = createStore(reducers, undefined, compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddlewareInstance,
        loggerMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(historyNavigationType, store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MyProjectContainer}>
                <IndexRedirect to="dashboard"/>
                <Route path="dashboard" component={Dashboard} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('my-project'));
