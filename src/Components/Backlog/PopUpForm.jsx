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
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAction } from "../../redux/store/slices/backlogSlice";

const PopupForm = ({id, setIsFormOpened, taskToBeUpdated }) => {

  const tasks = useSelector((state) => state.backlog.backlog);
  const dispatch = useDispatch()

  const [open, setOpen] = useState(true);
  const [doesTitleExist, setDoesTitleExist] = useState(false);
  let exists = false;


  // console.log(taskToBeUpdated);

  const [formData, setFormData] = useState({
    id: taskToBeUpdated.id,
    title: taskToBeUpdated.title,
    status: taskToBeUpdated.status,
    level: taskToBeUpdated.level,
    priority: taskToBeUpdated.priority,
    assignedTo: {
      email: taskToBeUpdated.assignedTo.email,
    },
    details: taskToBeUpdated.details,
    startDate: taskToBeUpdated.startDate,
    endDate: taskToBeUpdated.endDate
  });

  const handleClose = () => {
    setOpen(false);
    setIsFormOpened(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "assignedTo") {
      setFormData({ ...formData, [name]: { email: value } });
    } else
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    tasks.forEach(t => {
      if (t.title === formData.title) {
        exists = true;
        setDoesTitleExist(true);
      }
    });

    if (!exists) {
      dispatch(updateTaskAction({ projectId: id, taskId: taskToBeUpdated.id, updatedTask: formData }));
      handleClose();
    }
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
            // label="Name"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          {doesTitleExist && <div style={{
            color: 'red'
          }}>
            This title already exists!. Please Enter a unique title
          </div>}

          <TextField
            margin="dense"
            // label="Email"
            type="email"
            name="assignedTo"
            value={formData.assignedTo.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Task Details"
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            fullWidth
          />

          <Box sx={{ minWidth: 60, marginY: "1rem" }}>
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
          <Box sx={{ minWidth: 60, marginY: "1rem" }}>
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupForm;

