import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventsWithDates =  createAsyncThunk("backlog/getTasksWithDates",async (projectId)=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const tasks = res.data.tasks.filter((m) => m.startDate)
    console.log(tasks);
    return tasks;

})

const eventsWithDatesSlice =  createSlice({

    name:"EventWithDates",
    initialState:{eventsWithDates: []},

    extraReducers: (builder) => {
        builder.addCase(getEventsWithDates.fulfilled, (state, action) => {
            state.eventsWithDates = action.payload
        })
    }
})

export default eventsWithDatesSlice.reducer