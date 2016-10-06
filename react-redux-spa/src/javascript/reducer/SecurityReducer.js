'use strict';

import * as SecurityAction from '../action/SecurityAction';

const NO_AUTH_TOKEN = { "userId": "undefined-user" };

const initialState = {
    security: {
        authToken: NO_AUTH_TOKEN
    }
};

export default function security(state = initialState.security, { type, payload }) {
    switch (type) {
        case SecurityAction.SET_AUTH_INFO:
            return Object.assign({}, state, {
                authToken: payload.authToken,
                userId: payload.userId,
                userName: payload.userName
            });
        default:
            return state;
    }
}
