import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: {
        currentUser: null
    },
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser = action.payload
        }
    }
})

export default currentUserSlice.reducer
export const {setCurrentUser} = currentUserSlice.actions