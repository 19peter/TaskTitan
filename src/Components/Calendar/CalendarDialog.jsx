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

const CalendarDialog = ({id, info, setIsDialogOpened, setAllEvents, UpdateTaskDate }) => {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.backlog.backlog);
  const [selectedTask, setSelectedTask] = useState('');

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    dispatch(getBacklogAction(id));
  }, [dispatch, id]);

  const handleTaskChange = (e) => {
    // console.log(e.target.value);
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
              const taskUpdated = allTasks.find((t) => t.id === selectedTask);
              UpdateTaskDate(taskUpdated);

              setAllEvents((old) => {
                
                let data = old.filter((o) => o.title !== taskUpdated.title )
                return [...data,
                {
                  start: info.startStr,
                  end: info.endStr,
                  title: taskUpdated.title,
                }
                ]


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
                <InputLabel
                //  id={`status-label-`}
                 >Tasks</InputLabel>
                <Select
                  // labelId={`status-label-`}
                  // id={`status-select-`}
                  name="tasks"
                  value={selectedTask }
                  onChange={handleTaskChange}
                >
                  {allTasks.map((task) => {
                    // console.log(task);
                    
                    return (
                      <MenuItem key={task.id} value={task.id}>
                        {task.title}
                      </MenuItem>
                    )
                  })}
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
