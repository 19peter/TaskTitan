import "./App.css";
// import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Boardpage from "./../pages/Boardpage";
import Backlog from "../Components/Backlog/Backlog.jsx";
import CalendarComp from "../Components/Calendar/CalendarComp.jsx";
import ProjectPage from "../pages/ProjectPage.jsx";
import Intro from "../Components/Intro/intro.jsx";

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Backlog></Backlog> },
    { path: '/calender', element: <CalendarComp></CalendarComp> },

  ])


  return (
    <Provider store={store}>
      <div className="App">
        {/* <TimelinePge></TimelinePge> */}
        {/* <Boardpage></Boardpage> */}
        {/* <Backlog></Backlog>  */}
        {/* <CalendarComp></CalendarComp> */}
        {/* <ProjectPage></ProjectPage> */}
        <RouterProvider router={router}>

        </RouterProvider>
        {/* <Intro></Intro> */}
      </div>
    </Provider>
  );
}

export default App;
