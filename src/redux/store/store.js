import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";
// import userSlice from "./slices/userSlice";
import eventsWithDatesSlice from "./slices/eventsWithDates";
import isUserInDBSlice from "./slices/isUserInDBSlice";
import currentUserSlice from "./slices/currentUserSlice";
import projectReducer from "./slices/projectSlice"

const store = configureStore({
    reducer:{
       backlog:backlogSlice,
       eventsWithDates:eventsWithDatesSlice,
       isUserInDB:isUserInDBSlice,
       currentUser:currentUserSlice,
       project:projectReducer
    }
})

export default store;