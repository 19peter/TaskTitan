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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllUsersAction,
  setUserNotification,
} from "../../redux/store/slices/usersSlice";

import { getProjectById } from "../../redux/store/slices/projectSlice";

const InviteMember = ({ id }) => {
  const pointer = useRef();
  console.log(id);
  const projectId = "1";
  const projectName = "Event Reservation";
  const project = useSelector((state) => state.projects.project);

  const dispatch = useDispatch();
  // let invitedUser = {};
  const [emailUser, setEmailUser] = useState("");
  const [invitedUser, setInvitedUser] = useState({});

  const users = useSelector((state) => state.users.users);
  //   console.log(users);
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  useEffect(() => {
    dispatch(getAllUsersAction());
    dispatch(getProjectById(id));
  }, []);

  const handlechange = (e, newValue) => {
    // setUserEmail(e.target.value);
    // console.log(e.target.value);
    console.log(newValue);
    // invitedUser = { ...newValue };
    setInvitedUser({ ...newValue });
    // setEmailUser("newValue");
    console.log(invitedUser);
  };

  const handleSubmit = (event) => {
    console.log("pro", project);
    console.log(role);
    event.preventDefault();
    console.log(invitedUser);

    invitedUser.invitations = [
      ...invitedUser.invitations,
      {
        projectId: project.id,
        projectName: project.title,
        ProjectManger: project.manager.name,
        role: role,
      },
    ];
    console.log(pointer);
    // dispatch(setUserNotification(invitedUser));
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
        // value={emailUser}
        onChange={handlechange}
        sx={{
          width: 300,
          "& .MuiAutocomplete-inputRoot": {
            color: "#66FCF1", // Change input text color
            backgroundColor: "#0b0c10",
            borderRadius: "13px",
          },

          "& .MuiAutocomplete-popupIndicator": {
            color: "#66FCF1", // Change dropdown indicator color
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "#66FCF1", // Change clear button color
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
        renderInput={(params) => {
          // console.log(params.inputProps.ref.current.value);
          return (
            <TextField
              ref={pointer}
              style={{ color: "red" }}
              variant="outlined"
              color="primary"
              {...params}
              InputLabelProps={{
                style: { color: "#66FCF1" }, // Change the color to red
              }}
              label=" choose Member Email "
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            ></TextField>
          );
        }}
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
            style: { color: "#66FCF1" }, // Change the color to red
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
