import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const CalendarDialog = ({setTitle, setIsDialogOpened}) => {

  const [open, setOpen] = React.useState(true);

  
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const projectTitle = formJson.email;
            setTitle(projectTitle);
            handleClose();
          },
        }}
      >
        <DialogTitle>You'r Projects</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter You'r project Name to be added as an event in your Dialog
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Project Title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
}

export default CalendarDialog;
