import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
       backlog:backlogSlice,
       user:userSlice
    }
})

export default store;