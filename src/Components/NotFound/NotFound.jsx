import React from "react";
import img from "../../images/errorPage.jpeg";
import classes from "./NotFound.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <img src={img} alt="das" />
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go To Home
      </Button>
    </div>
  );
};

export default NotFound;
