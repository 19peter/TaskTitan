import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import landing from "../../images/landing.jpg";
import landing4 from "../../images/landing4.png";
import classes from "./intro.module.css";
import Backdrop from "@mui/material/Backdrop";
import SignIn from "../Signin/signin";

const Intro = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container height={"100vh"} bgcolor={"#060F27"}>
        <Grid item md={6} margin={"auto"}>
          <h1 className={classes.title}>Welcome to TaskTitan</h1>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ backgroundColor: "#d8eaec", color: "#060F27" }}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item md={6}>
          <img src={landing4} alt="img" width={"100%"} height={"100%"} />
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
        <SignIn></SignIn>
      </Backdrop>
    </>
  );
};

export default Intro;
