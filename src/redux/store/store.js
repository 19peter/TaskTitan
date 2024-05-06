import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";
import userSlice from "./slices/userSlice";
import eventsWithDatesSlice from "./slices/eventsWithDates";
import isUserInDBSlice from "./slices/isUserInDBSlice";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
    reducer:{
       backlog:backlogSlice,
       eventsWithDates:eventsWithDatesSlice,
       isUserInDB:isUserInDBSlice,
       currentUser:currentUserSlice
    }
})

export default store;