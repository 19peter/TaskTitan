import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let newUser = {};

export const getUserAction = createAsyncThunk("users/getUser", async (user) => {
  newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
  // console.log(user.id);
  const res = await axios.get("http://localhost:8000/users/" + user.id);
  // console.log(res.data);
  return res.data;
});

export const getUserAction2 = createAsyncThunk(
  "users/getUser2",
  async (email) => {
    const res = await axios.get("http://localhost:8000/users/");
    const users = res.data;
    const UserFound = users.find((u) => u.email === email);
    // console.log(UserFound);
    if (UserFound) return UserFound;
    throw new Error("error");
  }
);

const isUserInDBSlice = createSlice({
  name: "user",
  initialState: { user: null },
  extraReducers: (builder) => {
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      newUser = { ...newUser, userProjects: [], invitations: [] };
      axios.post("http://localhost:8000/users/", newUser).then(() => {
        console.log("added successfully");
      });
    });

    builder.addCase(getUserAction2.fulfilled, (state, action) => {
      console.log("innnn");
      state.user = action.payload;
    });

    builder.addCase(getUserAction2.rejected, (state, action) => {
      console.log("error");
      state.user = null;
    });
  },
});

export default isUserInDBSlice.reducer;
