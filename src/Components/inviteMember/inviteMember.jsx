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

const InviteMember = () => {
  const projectId = "1";
  const projectName = "Event Reservation";

  const dispatch = useDispatch();
  // let invitedUser = {};
  const [invitedUser, setInvitedUser] = useState({});

  const users = useSelector((state) => state.users.users);
  //   console.log(users);
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const handlechange = (e, newValue) => {
    // setUserEmail(e.target.value);
    console.log(newValue);
    // invitedUser = { ...newValue };
    setInvitedUser({ ...newValue });
    console.log(invitedUser);
  };

  const handleSubmit = (event) => {
    console.log(role);
    event.preventDefault();
    console.log(invitedUser);

    invitedUser.invitations = [
      ...invitedUser.invitations,
      {
        projectId: projectId,
        projectName: projectName,
        role: role,
      },
    ];

    dispatch(setUserNotification(invitedUser));
  };

  return (
    <div>
      <Autocomplete
        id="country-select-demo"
        // value={userEmail}

        onChange={handlechange}
        sx={{ width: 300 }}
        options={users}
        autoHighlight
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
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"Leader"}>Leader</MenuItem>
          <MenuItem value={"Member"}>Member</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleSubmit}
        // type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, width: "60%", backgroundColor: "#060F27" }}
      >
        Sign In
      </Button>
    </div>
  );
};

export default InviteMember;
