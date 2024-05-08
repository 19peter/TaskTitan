import "./App.css";
// import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Boardpage from "./../pages/Boardpage";
import Backlog from "../Components/Backlog/Backlog.jsx";
import CalendarComp from "../Components/Calendar/CalendarComp.jsx";
import BacklogCalender from "../pages/BacklogCalender.jsx";
import Intro from "../Components/Intro/intro.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/store/slices/currentUserSlice.js";
import Project from "../Components/Project/Project.jsx";
import Navbar from "../Components/NavBar/navbar.jsx";
import SignIn from "../Components/Signin/signin.jsx";
import Home from "../Components/Home/home.jsx";
import Dashboard from "../Components/Dashboard/dashboard.jsx";
import Members from "../Components/Members/members.jsx";
import InviteMember from "../Components/inviteMember/inviteMember.jsx";
import TestNotification from "../Components/testNotification/testNotification.jsx";
import axios from "axios";
import NotFound from "../Components/NotFound/NotFound.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = localStorage.getItem("id");
    if (userId) {
      axios.get("http://localhost:8000/users/" + userId).then((res) => {
        dispatch(setCurrentUser(res.data));
      });
    }
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Intro /> },
    { path: "/signin", element: <SignIn /> },
    {
      element: <Navbar />,
      children: [
        { path: "/home", element: <Home /> },
        {
          path: "/project/:id",
          element: (
            <Project
              data={[
                "Board",
                "Collaborators",
                "Dashboard",
                "Backlog",
                "Calender",
                "BacklogCalender",
                "InviteMember",
              ]}
            />
          ),
        },
        // { path: "/backlog", element: <Backlog /> },
        // { path: "/calender", element: <CalendarComp /> },
        // { path: "/board", element: <Boardpage /> },
        // { path: "/dashboard", element: <Dashboard /> },
        // { path: "/members", element: <Members /> },

        // { path: "/InviteMember", element: <InviteMember></InviteMember> },
        { path: "/testNotify", element: <TestNotification></TestNotification> },
      ],
    },
    { path: "*", element: <NotFound></NotFound> },
  ]);

  return (
    // <Provider store={store}>
    <RouterProvider router={router}>
      <>
        {/* <TimelinePge></TimelinePge> */}
        {/* <Boardpage></Boardpage> */}
        {/* <Backlog></Backlog>  */}
        {/* <CalendarComp></CalendarComp> */}
        {/* <ProjectPage></ProjectPage> */}
        <RouterProvider router={router}></RouterProvider>
        {/* <Intro></Intro> */}
        {/* <ResponsiveDrawer/> */}
        {/* <Navbar/> */}
      </>
    </RouterProvider>
    // </Provider>
  );
}

export default App;
