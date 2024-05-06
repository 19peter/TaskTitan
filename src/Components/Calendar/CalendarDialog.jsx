import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { getBacklogAction } from "../../redux/store/slices/backlogSlice";
import { useSelector } from "react-redux";

const CalendarDialog = ({ info, setIsDialogOpened, setEvent, UpdateTaskDate }) => {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.backlog.backlog);
  const [selectedTask, setSelectedTask] = useState();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    dispatch(getBacklogAction(1));
  }, []);

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  const handleClose = () => {
    setIsDialogOpened(false);
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const taskUpdated = allTasks.find((t) => t.title ===selectedTask);
              UpdateTaskDate(taskUpdated);
              setEvent({
                start: info.startStr,
                end: info.endStr,
                title: selectedTask,
              });
              handleClose();
            },
          }}
        >
          <DialogTitle>You'r Projects</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter You'r project Name to be added as an event in your Dialog
            </DialogContentText>
            <Box sx={{ minWidth: 60, marginY: "1rem" }}>
              <FormControl fullWidth>
                <InputLabel id={`status-label-`}>Tasks</InputLabel>
                <Select
                  labelId={`status-label-`}
                  id={`status-select-`}
                  name="tasks"
                  value={selectedTask}
                  onChange={handleTaskChange}
                >
                  {allTasks.map((task) => (
                    <MenuItem key={task.id} value={task.title}>
                      {task.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default CalendarDialog;
