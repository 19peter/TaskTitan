import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import {v4 as uuid} from "uuid"
import { AddTaskAction } from "../../redux/store/slices/backlogSlice";
import { useSelector } from "react-redux";

const PopAddTaskForm = ({setIsAddFormOpened}) => {

  const [open, setOpen] = useState(true);
  const backlogTasks = useSelector((state) => state.backlog.backlog); // Assuming you have access to tasks in your redux store

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    status: "Backlog",
    level: "",
    priority: "",
    assignedTo: {}
  });

  const handleClose = () => {
    setOpen(false);
    setIsAddFormOpened(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="assignedTo"){
    setFormData({ ...formData, [name]: {email: value} });
    }else
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    formData.id = uuid()
    // console.log(formData);
    const existingTask = backlogTasks.find((task) => task.title === formData.title);
    if (existingTask) {
      alert("Task with this title already exists. Please choose a different title.");
      return;
    }
    dispatch(AddTaskAction({projectId: "1", AddedTask: formData}))
    handleClose();
  };

    return (
        <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Data</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your task data:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            name="assignedTo"
            value={formData.assignedTo.email}
            onChange={handleChange}
            fullWidth
          />
          <Box sx={{ minWidth: 60,marginY: "1rem" }}>
            <FormControl fullWidth>
              <InputLabel id={`status-label-`}>Level</InputLabel>
              <Select
                labelId={`status-label-`}
                id={`status-select-`}
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="intermediate">intermediate</MenuItem>
                <MenuItem value="difficult">Difficult</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 60 ,marginY: "1rem"}}>
            <FormControl fullWidth>
              <InputLabel id={`status-label-`}>Priority</InputLabel>
              <Select
                labelId={`status-label-`}
                id={`status-select-`}
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default PopAddTaskForm;
