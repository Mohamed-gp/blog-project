import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";
const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
    },
});

export default store;
const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
};

export default loginReducer;

// FILEPATH: /c:/Users/pc/Desktop/New folder/front-end/src/redux/reducers/registerReducer.js
const initialState = {
    isRegistered: false,
    user: null,
    error: null,
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isRegistered: true,
                user: action.payload,
                error: null,
            };
        case "REGISTER_FAILURE":
            return {
                ...state,
                isRegistered: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default registerReducer;
