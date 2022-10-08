import {configureStore, createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {isLoggedIn : false},
    reducers : {
        login(state){
            state.isLoggedIn = true
            localStorage.setItem("user_login_12321","true");
        },

        logout(state){
            state.isLoggedIn = false
            localStorage.setItem("user_login_12321","false");
        },
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer : authSlice.reducer,
});