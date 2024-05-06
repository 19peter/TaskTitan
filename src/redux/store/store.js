import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";
import userSlice from "./slices/userSlice";
import eventsWithDatesSlice from "./slices/eventsWithDates";

const store = configureStore({
    reducer:{
       backlog:backlogSlice,
       user:userSlice,
       eventsWithDates:eventsWithDatesSlice
    }
})

export default store;