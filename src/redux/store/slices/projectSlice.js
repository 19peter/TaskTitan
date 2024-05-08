import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProject = createAsyncThunk("projects/addProject", async (newPproject) => {
    try {
        const response = await axios.post('http://localhost:8000/projects', newPproject);
        console.log('Project added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding Project:', error);
        throw error;
    }
});

export const getProjects = createAsyncThunk("projects/getProjects", async () => {
    try {
        const response = await axios.get('http://localhost:8000/projects');
        console.log("from get proooojects"+response.data) 
        return response.data;
    } catch (error) {
        console.error('Error catching data:', error);
        throw error;
    }
});

export const getProjectById = createAsyncThunk("projects/getProjectById",
    async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8000/projects/${projectId}`);
            console.log("from get proooojects BY IDDDDD"+response.data) 
            return response.data;
            
        }
        catch (error) {
            console.error('Error catching data:', error);
            throw error;
        }

})

const ProjectSlice = createSlice({
    name: "projects",
    initialState: { projects: [] },
    extraReducers: (builder) => {
        builder
            .addCase(addProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
                // console.log(state.projects);
            })

            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
            })
            .addCase(getProjectById.fulfilled,(state, action) => {
                state.projects = action.payload;
            })
    }

});
export default ProjectSlice.reducer;