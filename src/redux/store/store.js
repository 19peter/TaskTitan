import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";
import userSlice from "./slices/isUserInDBSlice";
import isUserInDBSlice from "./slices/isUserInDBSlice";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
    reducer:{
       backlog:backlogSlice,
       isUserInDB:isUserInDBSlice,
       currentUser:currentUserSlice
    }
})

export default store;