import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TextField, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/store/slices/projectSlice';
import { useSelector } from 'react-redux';

const CreateProjectForm = () => {

    const dispatch = useDispatch();
    const cur_user = useSelector(state=>state.currentUser.currentUser);
    console.log(cur_user);

    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        name:''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const id = uuid();
        const userId = cur_user.id;
        const email = cur_user.email;

        
        

        const projectData = {
            id: id,
            manager: { email: email, id:userId ,name:formData.name},
            tasks:[],
            members:[],
            ...formData
        };
        //add project data
        dispatch(addProject(projectData));
        // Clear the form after submission
        setFormData({
            title: '',
            startDate: '',
            endDate: '',
            name:''
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Manager Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                color: "white", backgroundColor: "#1565c0",
                                "&:hover": { backgroundColor: "#0d47a1", }
                            }}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default CreateProjectForm;
