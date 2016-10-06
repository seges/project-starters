'use strict'

import React from 'react';
import {connect} from 'react-redux';

import MyProject from '../component/MyProject';

import * as SecurityAction from '../action/SecurityAction';

const mapStateToProps = (state) => {
    return {
        userName: state.security.userName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthInfo: () => {
            dispatch(SecurityAction.setAuthInfo("abc", "123", "Bruce Wayne"));
        }
    }
};

const MyProjectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProject);

export default MyProjectContainer;
