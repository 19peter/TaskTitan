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
import {
  handleDisagreeUserInvitations,
  updateUserProjects,
} from "../../redux/store/slices/currentUserSlice";
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const currentUser = useSelector((state) => state.currentUser.currentUser);

  if (currentUser) console.log(currentUser.invitations);

  const dispatch = useDispatch();

  const handleClickAccept = ({ projectId, role }) => {
    console.log(projectId);
    console.log(role);
    let obj = {
      userId: currentUser.id,
      project: { role: role, projectId: projectId, assignedTasks: [] },
    };
    console.log(obj);
    dispatch(updateUserProjects(obj));
  };

  const handleDisAgreeClk = ({ projectId }) => {
    console.log("Disagree");
    console.log(projectId);
    let obj = {
      userId: currentUser.id,
      projectId: projectId,
    };

    dispatch(handleDisagreeUserInvitations(obj));
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
          {currentUser.invitations.length > 0 ? (
            currentUser.invitations.map((invitation) => (
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

                  <Button
                    onClick={() => {
                      handleDisAgreeClk({
                        projectId: invitation.projectId,
                      });
                    }}
                  >
                    Disagree
                  </Button>
                </MenuItem>
              </>
            ))
          ) : (
            <MenuItem>No Notifacations</MenuItem>
          )}
        </Menu>
      </div>
    );
}
