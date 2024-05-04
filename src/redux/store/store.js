import { configureStore } from "@reduxjs/toolkit";
import backlogSlice from "./slices/backlogSlice";

const store = configureStore({
    reducer:{
       backlog:backlogSlice 
    }
})

export default store;