import "./App.css";
import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import Boardpage from "./../pages/Boardpage";
import Backlog from "../Components/Backlog/Backlog.jsx";



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <TimelinePge></TimelinePge> */}
        {/* <Boardpage></Boardpage> */}
        <Backlog></Backlog>
      </div>
    </Provider>
  );
}

export default App;
