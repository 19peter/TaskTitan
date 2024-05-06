import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";



export const getBacklogAction =  createAsyncThunk("backlog/getAll",async (projectId)=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    console.log(res.data.tasks);
    return  res.data.tasks; 

})

export const updateTaskStatusAction =  createAsyncThunk("backlog/updateTaskStatus",async ({projectId,taskId,newStatus})=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = res.data.tasks.map((t)=>{
        if(t.id === taskId){
            t.status = newStatus;
        }
        return t;
    })
    axios.put("http://localhost:8000/projects/"+projectId,{...res.data,tasks:array})
    return  array; 

})

export const updateTaskAction =  createAsyncThunk("backlog/updateTask",async ({projectId,taskId,updatedTask})=>{
    console.log(updatedTask);
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = res.data.tasks.map((t)=>{
        if (t.id === taskId) {
            return updatedTask; 
        }
        return t;
    })
    axios.put("http://localhost:8000/projects/"+projectId,{...res.data,tasks:array})
    return  array; 
})

export const AddTaskAction =  createAsyncThunk("backlog/AddTask",async ({projectId, AddedTask})=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = [...res.data.tasks, AddedTask]
    axios.put("http://localhost:8000/projects/"+projectId,{...res.data,tasks:array})
    return  array; 
})
export const DelteTaskAction =  createAsyncThunk("backlog/DeleteTask",async ({projectId, deletedTaskId})=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = res.data.tasks.filter((t) => t.id !== deletedTaskId)
    axios.put("http://localhost:8000/projects/"+projectId,{...res.data,tasks:array})
    return  array; 
})

export const UpdateTaskDateAction =  createAsyncThunk("backlog/UpdateTaskDate",async ({projectId, taskId, startDate, endDate})=>{
    const res = await axios.get("http://localhost:8000/projects/"+projectId);
    const array = res.data.tasks.map((t) => {
        if (t.id === taskId) {
            t.startDate = startDate;
            t.endDate = endDate;
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

        builder.addCase(updateTaskAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })

        builder.addCase(AddTaskAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })
        builder.addCase(DelteTaskAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })
        builder.addCase(UpdateTaskDateAction.fulfilled, (state, action) => {
            state.backlog = action.payload
        })
    }
})

export default backlogSlice.reducer;