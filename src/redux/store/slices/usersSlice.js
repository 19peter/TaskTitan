import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsersAction = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    const res = await axios.get("http://localhost:8000/users/");
    return res.data;
  }
);

export const setUserNotification = createAsyncThunk(
  "users/setUserNotification",
  async (user) => {
    const res = await axios.put("http://localhost:8000/users/" + user.id, user);
    return res.data;
  }
);

export const getUserInvitation = createAsyncThunk(
  "users/getUserInvitation",
  async (id) => {
    const res = await axios.get("http://localhost:8000/users/" + id);

    return res.data.invitations;
  }
);

const allUsersSlice = createSlice({
  name: "users",
  initialState: { users: null, userInvitations: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUsersAction.rejected, (state, action) => {
      console.log("error");
    });
    builder.addCase(getUserInvitation.fulfilled, (state, action) => {
      state.userInvitations = action.payload;
    });
  },
});

export default allUsersSlice.reducer;
