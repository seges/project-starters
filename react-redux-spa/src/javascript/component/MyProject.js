'use strict';

import React from 'react';
import { Component, PropTypes } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {lightGreen500} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightGreen500
    },
});

const style = {
    paper: {
        margin: 20,
        padding: 20
    }
};

const MyProject = ({ userName, children, setAuthInfo }) => {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <div>
                    <Paper style={style.paper}>
                        {userName}
                    </Paper>
                </div>
                <div>
                    <Paper style={style.paper}>
                           { children || "Nothing" }

                           <RaisedButton label="Set Authentication" onClick={setAuthInfo} />
                    </Paper>

                </div>
            </div>
        </MuiThemeProvider>
    );
};

export default MyProject;
