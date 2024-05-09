import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllUsersAction,
  setUserNotification,
} from "../../redux/store/slices/usersSlice";

import { getProjectById } from "../../redux/store/slices/projectSlice";

const InviteMember = ({ id }) => {
  console.log(id);
  const projectId = "1";
  const projectName = "Event Reservation";
  const project = useSelector((state) => state.projects.project);

  const dispatch = useDispatch();
  const [invitedUser, setInvitedUser] = useState({});

  const [selectedUser, setSelectedUser] = useState(null); 

  const users = useSelector((state) => state.users.users);
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  
  useEffect(() => {
    dispatch(getAllUsersAction());
    dispatch(getProjectById(id));
  }, []);

  const handlechange = (e, newValue) => {
    setSelectedUser(newValue); 
    setInvitedUser({ ...newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    invitedUser.invitations = [
      ...invitedUser.invitations,
      {
        projectId: project.id,
        projectName: project.title,
        ProjectManger: project.manager.name,
        role: role,
      },
    ];
    dispatch(setUserNotification(invitedUser));
    setSelectedUser(null); 
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5vh",
      }}
    >
      <Autocomplete
        onChange={handlechange}
        value={selectedUser} 
        sx={{
          width: 300,
          "& .MuiAutocomplete-inputRoot": {
            color: "#66FCF1",
            backgroundColor: "#0b0c10",
            borderRadius: "13px",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "#66FCF1",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "#66FCF1",
          },
        }}
        options={users}
        getOptionLabel={(option) => option.email}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.email}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            style={{ color: "red" }}
            variant="outlined"
            color="primary"
            {...params}
            InputLabelProps={{
              style: { color: "#66FCF1" },
            }}
            label=" choose Member Email "
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          ></TextField>
        )}
      />
      <FormControl sx={{ width: 300, borderRadius: "13px" }}>
        <InputLabel>Role</InputLabel>
        <TextField
          select
          value={role}
          label="Role"
          variant="outlined"
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "#66FCF1" },
          }}
          sx={{ color: "#66FCF1", backgroundColor: "#0b0c10" }}
        >
          <MenuItem value={"Leader"}>Leader</MenuItem>
          <MenuItem value={"Member"}>Member</MenuItem>
        </TextField>
      </FormControl>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          width: "10%",
          color: "#0b0c10",
          backgroundColor: "#66FCF1",
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default InviteMember;
