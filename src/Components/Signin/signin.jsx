import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img from "../../images/signImage.gif";
import { Badge, IconButton, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Google } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUserAction,
  getUserAction2,
} from "../../redux/store/slices/isUserInDBSlice";
import { setCurrentUser } from "../../redux/store/slices/currentUserSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import isUserInDBSlice from "./../../redux/store/slices/isUserInDBSlice";

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function SignIn({ closeSignin }) {
  const [user, setUser] = useState(null); //signin state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const UserSignin = useSelector((state) => state.isUserInDB.user);
  console.log(UserSignin);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse); //token
      closeSignin();
      // navigate("/board");
      //redirect to dashboard
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // useEffect(() => {
  //   dispatch(setCurrentUser(UserSignin));
  // }, [UserSignin, dispatch]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data.id);
          dispatch(getUserAction(res.data));
          dispatch(setCurrentUser(UserSignin));
          console.log(res.data);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("picture", res.data.picture);
          localStorage.setItem("email", res.data.email);
          console.log(UserSignin);
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } else if (UserSignin) {
      localStorage.setItem("id", UserSignin.id);
      localStorage.setItem("name", UserSignin.name);
      localStorage.setItem("picture", UserSignin.picture);
      localStorage.setItem("email", UserSignin.email);

      dispatch(setCurrentUser(UserSignin));

      navigate("/home");
    }
  }, [UserSignin]);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userEmail);
    dispatch(getUserAction2(userEmail));
    console.log(UserSignin);
    //false
    setInvalidEmail(true);
  };

  return (
    <Grid
      container
      sx={{ width: "60vw", borderRadius: "13px", height: "60vh" }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        item
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        square
        height={"100%"}
      >
        <Stack height={"100%"} alignItems={"center"}>
          <IconButton
            sx={{ width: "fit-content", alignSelf: "end" }}
            onClick={closeSignin}
          >
            <CancelIcon></CancelIcon>
          </IconButton>

          <Avatar sx={{ bgcolor: "#060F27" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <TextField
            margin="normal"
            error={invalidEmail ? true : false}
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              width: "70%",
              // border: invalidEmail ? "2px solid red" : "none",
            }}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            value={userEmail}
          />

          <Button
            onClick={handleSubmit}
            // type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "60%", backgroundColor: "#060F27" }}
          >
            Sign In
          </Button>
          <Button
            onClick={login}
            variant="contained"
            startIcon={<Google></Google>}
            sx={{ mt: 3, mb: 2, width: "60%", backgroundColor: "#060F27" }}
          >
            sign in with google
          </Button>
        </Stack>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
}
