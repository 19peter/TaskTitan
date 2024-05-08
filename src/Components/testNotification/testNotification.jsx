import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { getUserInvitation } from "../../redux/store/slices/usersSlice";
import { useSelector } from "react-redux";
import { getProjectById } from "../../redux/store/slices/projectSlice";
import { updateUserProjects } from "../../redux/store/slices/currentUserSlice";
import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import InviteMember from "./../inviteMember/inviteMember";

export default function TestNotification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleCloseMenu();
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  let id = "114450078144869306460";
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  // const invitations = useSelector((state) => state.users.userInvitations);

  if (currentUser) console.log(currentUser.invitations);
  // console.log(invitations);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserInvitation(id));
  }, [id, dispatch]);

  const handleClickAccept = ({ projectId, role }) => {
    console.log(projectId);
    console.log(role);
    let obj = {
      userId: id,
      project: { role: role, projectId: projectId, assignedTasks: [] },
    };
    console.log(obj);
    dispatch(updateUserProjects(obj));
    // dispatch(getUserInvitation(id));
    //todo
  };
  const handleAgreeClk = () => {
    console.log("agree");
  };
  const handleDisAgreeClk = () => {
    console.log("Disagree");
  };
  if (currentUser)
    return (
      <div>
        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          PaperProps={{
            style: {
              maxHeight: "25vh",
              width: "40ch",
            },
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {currentUser.invitations.map((invitation) => (
            <>
              <MenuItem>
                {invitation.projectName}
                <Button
                  onClick={() => {
                    console.log(invitation.role);
                    handleClickAccept({
                      projectId: invitation.projectId,
                      role: invitation.role,
                    });
                  }}
                >
                  agree
                </Button>

                <Button onClick={handleDisAgreeClk}>Disagree</Button>
              </MenuItem>

              {/* <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle id="alert-dialog-title">
                  {invitation.projectName}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running. {invitation.projectName}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Disagree</Button>
                  <Button onClick={handleCloseDialog} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog> */}
            </>
          ))}
        </Menu>
      </div>
      // <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      //   {invitations.map((invitation) => (
      //     <ListItem
      //       key={invitation}
      //       disableGutters
      //       secondaryAction={
      //         <IconButton
      //           aria-label="comment"
      //           onClick={() => {
      //             console.log(invitation.role);
      //             handleClickAccept({
      //               projectId: invitation.projectId,
      //               role: invitation.role,
      //             });
      //           }}
      //         >
      //           <CommentIcon />
      //         </IconButton>
      //       }
      //     >
      //       <ListItemText primary={invitation.projectName} />
      //     </ListItem>
      //   ))}
      // </List>
    );
}
