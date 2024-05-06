import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserAction } from "../redux/store/slices/isUserInDBSlice";

function Test() {
  const [user, setUser] = useState(null);//signin state
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) =>{ 
      setUser(codeResponse)//token
    },
    onError: (error) => console.log("Login Failed:", error),
  });



  useEffect(() => {
    if(localStorage.getItem("id"))
      {
        setProfile({
          id:localStorage.getItem("id"),
          name:localStorage.getItem("name"),
          picture:localStorage.getItem("picture"),
          email:localStorage.getItem("email")
        })
      }

    if (user) {
      // console.log(user.access_token);
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
          // console.log(res.data);
          setProfile(res.data);
          localStorage.setItem("id",res.data.id)
          localStorage.setItem("name",res.data.name)
          localStorage.setItem("picture",res.data.picture)
          localStorage.setItem("email",res.data.email)
          dispatch(getUserAction(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.clear();
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default Test;
//1-check local storage? if found show signout
//2-signIn
//3-check database if found do nothing
//4-add to database
//5-add to localStorage
