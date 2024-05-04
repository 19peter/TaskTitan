import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBacklogAction =  createAsyncThunk("backlog/getAll",async (projectId)=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    return  res.data.tasks; 

})

const backlogSlice = createSlice({
    name:"backlog",
    initialState:{backlog:[]},
    extraReducers:(builder)=>{
        builder.addCase(getBacklogAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })
    }
})

export default backlogSlice.reducer;