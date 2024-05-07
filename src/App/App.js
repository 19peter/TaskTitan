// import "./App.css";
// import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Boardpage from "./../pages/Boardpage";
import Backlog from "../Components/Backlog/Backlog.jsx";
import CalendarComp from "../Components/Calendar/CalendarComp.jsx";
import ProjectPage from "../pages/ProjectPage.jsx";
import Intro from "../Components/Intro/intro.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/store/slices/currentUserSlice.js";
import ResponsiveDrawer from "../Components/Members/members.jsx";
import Navbar from "../Components/NavBar/navbar.jsx";

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
    { path: '/', element: <Backlog></Backlog> },
    { path: '/calender', element: <CalendarComp></CalendarComp> },

    { path: "/members", element: <ResponsiveDrawer data={['Team Leaders', 'Members', 'Invite Members']}></ResponsiveDrawer> },

    { path: "/home", element: <ResponsiveDrawer data={['Projects', 'Dashboard', 'Calender']}></ResponsiveDrawer>  },

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
        <Navbar/>
      </>
    </RouterProvider>
    // </Provider>
  );
}

export default App;
