import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserProjects = createAsyncThunk(
  "users/updateUserProjects",
  async ({ userId, project }) => {
    const res = await axios.get("http://localhost:8000/users/" + userId);

    const projectRes = await axios.get(
      "http://localhost:8000/projects/" + project.projectId
    );

    const projectDB = projectRes.data;

    console.log(projectDB);
    const user = res.data;

    user.userProjects = [...user.userProjects, project];
    projectDB.members = [
      ...projectDB.members,
      { email: user.email, id: user.id },
    ];
    console.log(user.invitations);
    user.invitations = user.invitations.filter(
      (Invitation) => Invitation.projectId !== project.projectId
    );
    console.log(user.invitations);

    await axios.put(
      "http://localhost:8000/projects/" + project.projectId,
      projectDB
    );

    const res2 = await axios.put("http://localhost:8000/users/" + userId, user);
    return res2.data;
  }
);

export const handleDisagreeUserInvitations = createAsyncThunk(
  "users/handleDisagreeUserInvitations",
  async ({ userId, projectId }) => {
    const res = await axios.get("http://localhost:8000/users/" + userId);
    const user = res.data;
    console.log(user);
    user.invitations = user.invitations.filter(
      (Invitation) => Invitation.projectId !== projectId
    );

    const res2 = await axios.put("http://localhost:8000/users/" + userId, user);
    return res2.data;
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateUserProjects.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(
      handleDisagreeUserInvitations.fulfilled,
      (state, action) => {
        state.currentUser = action.payload;
      }
    );
  },
});

export default currentUserSlice.reducer;
export const { setCurrentUser } = currentUserSlice.actions;
