import * as React from 'react';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ task, setFullScreenDialogFlag, allTasks  }) {

  const currentTask = allTasks.find((t) => t.title === task);
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
    setFullScreenDialogFlag(false);
  };

  return (
    <React.Fragment>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ backgroundColor: 'black' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {currentTask.title}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Status" secondary={currentTask.status} />
          </ListItemButton>

          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Priority"
              secondary={currentTask.priority}
            />
          </ListItemButton>


          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Start Date"
              secondary={currentTask.startDate}
            />
          </ListItemButton>


          <Divider />
          <ListItemButton>
            <ListItemText
              primary="End Date"
              secondary={currentTask.endDate}
            />
          </ListItemButton>


          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Assigned To"
              secondary={currentTask.assignedTo.email}
            />
          </ListItemButton>


          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Level"
              secondary={currentTask.level}
            />
          </ListItemButton>


          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Details"
              secondary={currentTask.details}
            />
          </ListItemButton>


        </List>
      </Dialog>
    </React.Fragment>
  );
}
