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

export default function TestNotification() {
  let id = "114450078144869306460";
  const invitations = useSelector((state) => state.users.userInvitations);

  console.log(invitations);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserInvitation(id));
  }, []);

  const handleClickAccept = ({ projectId, role }) => {
    console.log(projectId);
    console.log(role);
    let obj = {
      userId: id,
      project: { role: role, projectId: projectId, assignedTasks: [] },
    };
    dispatch(updateUserProjects(obj));
    //todo
  };
  if (invitations)
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {invitations.map((invitation) => (
          <ListItem
            key={invitation}
            disableGutters
            secondaryAction={
              <IconButton
                aria-label="comment"
                onClick={() => {
                  console.log(invitation.role);
                  handleClickAccept({
                    projectId: invitation.projectId,
                    role: invitation.role,
                  });
                }}
              >
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={invitation.projectName} />
          </ListItem>
        ))}
      </List>
    );
}
