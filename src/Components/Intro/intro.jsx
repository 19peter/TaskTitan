import { Badge, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import landing from "../../images/landing.jpg";
import landing4 from "../../images/landing4.png";
import landing5 from "../../images/test.gif";

import landing6 from "../../images/dazzle-task-management.gif";

import classes from "./intro.module.css";
import Backdrop from "@mui/material/Backdrop";
import SignIn from "../Signin/signin";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/store/slices/currentUserSlice";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      dispatch(
        setCurrentUser({
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          picture: localStorage.getItem("picture"),
          email: localStorage.getItem("email"),
        })
      );
      // navigate("/test");
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Grid container height={"100vh"} bgcolor={"black"}>
        <Grid item md={6} margin={"auto"}>
          <h1 className={classes.title}>
            Welcome to <span style={{ color: "#66FCF1" }}>TaskTitan</span>
          </h1>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ backgroundColor: "#d8eaec", color: "#060F27" }}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item md={6}>
          <img
            src={landing5}
            alt="img"
            width={"60%"}
            height={"60%"}
            style={{ marginTop: "10%", marginLeft: "20%" }}
          />
        </Grid>
      </Grid>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        // onClick={handleClose}
      >
        <SignIn closeSignin={handleClose}></SignIn>
      </Backdrop>
    </>
  );
};

export default Intro;
