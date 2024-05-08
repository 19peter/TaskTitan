// import "./App.css";
// import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import Dashboard from "../Components/Dashboard/dashboard.jsx"
import Members from "../Components/Members/members.jsx"
import TestNotification from "../Components/testNotification/testNotification.jsx"
import InviteMember from "../Components/inviteMember/inviteMember.jsx"
import ProjectDashboard from "../Components/Dashboard/project_dashboard.jsx"
function App() {
  const dispatch = useDispatch();

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
    }
  }, []);

  // const router = createBrowserRouter([
  //   { path: "/board", element: <Boardpage></Boardpage> },
  //   { path: "/", element: <Intro></Intro> },
  // ]);

  const router = createBrowserRouter([
    // { path: '/', element: <Backlog></Backlog> },
    // { path: '/calender', element: <CalendarComp></CalendarComp> },
    // { path: "/collaborators", element: <ResponsiveDrawer data={['Collaborators', 'Invite Members']}></ResponsiveDrawer> },
    // { path: "/members/:id", element: <ResponsiveDrawer data={['Board', 'Members', 'Dashhboard']}></ResponsiveDrawer>  },
    // { path: "/intro", element: <Intro></Intro> },
    // { path: "/members", element: <ResponsiveDrawer data={['Dashboard','Projects']}/> },
    // { path: "/board", element: <Boardpage></Boardpage> },
    // { path: "/members/:id", element: <ResponsiveDrawer /> },
    { path: "/", element: <Intro/> },
    {path:"/TestNotification",element:<TestNotification></TestNotification>},
    { path: "/signin", element: <SignIn/> },
    { element:<Navbar/>,children:[
      { path: "/home", element: <Home/> },
      {path:"/InviteMember", element:<InviteMember></InviteMember>},
      { path: "/project/:id", element: <Project data={['Board', 'Collaborators', 'Dashboard','Backlog' , 'Calender','InviteMember']}/> },
      { path: "/backlog", element: <Backlog/> },
      { path: "/calender", element: <CalendarComp/> },
      { path: "/board", element: <Boardpage/> },
      { path: "/dashboard", element: <Dashboard/> },
      {path:"/members", element:<Members/>},
      {path:"/backlogCalender", element:<BacklogCalender/>},
      {path:"/prodashboard",element:<ProjectDashboard></ProjectDashboard>}
      
    ]},
  ])


  return (
    // <Provider store={store}>
    <RouterProvider router={router}>
      <>
        {/* <TimelinePge></TimelinePge> */}
        {/* <Boardpage></Boardpage> */}
        {/* <Backlog></Backlog>  */}
        {/* <CalendarComp></CalendarComp> */}
        {/* <ProjectPage></ProjectPage> */}
        <RouterProvider router={router}>
        
        </RouterProvider>
        {/* <Intro></Intro> */}
        {/* <ResponsiveDrawer/> */}
        {/* <Navbar/> */}
      </>
    </RouterProvider>
    // </Provider>
  );
}

export default App;