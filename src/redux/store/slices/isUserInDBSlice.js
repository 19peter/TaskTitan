import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let newUser = {}
export const getUserAction =  createAsyncThunk("users/getUser",async (user)=>{
    newUser = {id:user.id,name:user.name,email:user.email,picture:user.picture}
    const res = await axios.get("http://localhost:8000/users/"+user.id);
    return  res.data; 
})

const isUserInDBSlice = createSlice({
    name:"user",
    initialState:{user:{}},
    extraReducers:(builder)=>{
        builder.addCase(getUserAction.fulfilled,(state,action)=>{
            state.backlog = action.payload
        })
        builder.addCase(getUserAction.rejected,(state,action)=>{
            console.log(newUser);
            newUser = {...newUser,userProjects:[]}
            console.log(newUser);
            axios.post("http://localhost:8000/users/",newUser).then(()=>{console.log("added successfully");});
        })
    }
})

export default isUserInDBSlice.reducer;