import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/store/slices/projectSlice';
import { useSelector } from 'react-redux';

const CreateProjectForm = () => {

    const dispatch = useDispatch();
    const cur_user = useSelector(state => state.currentUser.currentUser);
    console.log(cur_user);

    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        name: '',
        backgroundColor: '#45a29e'
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
            manager: { email: email, id: userId, name: formData.name },
            tasks: [],
            members: [],
            ...formData
        };
        //add project data
        dispatch(addProject(projectData));
        // Clear the form after submission
        setFormData({
            title: '',
            startDate: '',
            endDate: '',
            name: '',
            backgroundColor: '45a29e'
        });
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            backgroundColor: value,
        }));
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

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Background Color</InputLabel>
                            <Select
                                value={formData.backgroundColor}
                                onChange={handleColorChange}
                                label="Background Color"
                                renderValue={(selected) => (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: 20, height: 20, backgroundColor: selected, marginRight: 8 }}></div>
                                        {selected}
                                    </div>
                                )}
                            >
                                <MenuItem value="#45a29e">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#45a29e' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#45a29e" />
                                </MenuItem>
                                <MenuItem value="#4db6ac">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#4db6ac' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#4db6ac" />
                                </MenuItem>
                                <MenuItem value="#1de9b6">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#1de9b6' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#1de9b6" />
                                </MenuItem>
                                <MenuItem value="#c2185b">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#c2185b' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#c2185b" />
                                </MenuItem>
                                <MenuItem value="#9575cd">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#9575cd' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#9575cd" />
                                </MenuItem>
                                <MenuItem value="#880e4f">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#880e4f' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#880e4f" />
                                </MenuItem>
                                <MenuItem value="#3f51b5">
                                    <ListItemIcon>
                                        <div style={{ width: 20, height: 20, backgroundColor: '#3f51b5' }}></div>
                                    </ListItemIcon>
                                    <ListItemText primary="#3f51b5" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                color: "white", backgroundColor: "black",
                                "&:hover": { backgroundColor: "black", }
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
