import "./App.css";
import TimelinePge from "../pages/Project.jsx";
import { Provider } from "react-redux";
import store from "../redux/store/store.js";
import Boardpage from "./../pages/Boardpage";
import Test from "../pages/test.jsx";

import Intro from "../Components/Intro/intro.jsx";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <TimelinePge></TimelinePge> */}
        {/* <Boardpage></Boardpage> */}
        {/* <Test></Test> */}
        {/* <TestImg></TestImg> */}
        <Intro></Intro>
      </div>
    </Provider>
  );
}

export default App;
