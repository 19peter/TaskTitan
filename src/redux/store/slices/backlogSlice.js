import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBacklogAction =  createAsyncThunk("backlog/getAll",async (projectId)=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    return  res.data.tasks; 

})

export const updateTaskStatusAction =  createAsyncThunk("backlog/updateTask",async ({projectId,taskId,newStatus})=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = res.data.tasks.map((t)=>{
        if(t.id == taskId){
            t.status = newStatus;
            
        }
        return t;
    })
    axios.put("http://localhost:8000/projects/"+projectId,{...res.data,tasks:array})
    return  array; 

})

const backlogSlice = createSlice({
    name:"backlog",
    initialState:{backlog:[]},
    extraReducers:(builder)=>{
        builder.addCase(getBacklogAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })

        builder.addCase(updateTaskStatusAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })
        
    }
})

export default backlogSlice.reducer;