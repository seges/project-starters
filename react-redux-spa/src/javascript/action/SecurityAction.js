'use strict';

export const SET_AUTH_INFO = "SET_AUTH_INFO";

export const setAuthInfo = (authToken, userId, userName) => {
    return {
        type: SET_AUTH_INFO,
        payload: {
            authToken,
            userId,
            userName
        }
    }
};