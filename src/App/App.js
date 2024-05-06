// import "./App.css";
// import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import Boardpage from "./../pages/Boardpage";
import Backlog from "../Components/Backlog/Backlog.jsx";
import CalendarComp from "../Components/Calendar/CalendarComp.jsx";
import ProjectPage from "../pages/ProjectPage.jsx";
import Intro from "../Components/Intro/intro.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/store/slices/currentUserSlice.js";

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

  const router = createBrowserRouter([
    { path: "/board", element: <Boardpage></Boardpage> },
    { path: "/", element: <Intro></Intro> },
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
        {/* <Intro></Intro> */}
      </>
    </RouterProvider>
    // </Provider>
  );
}

export default App;
