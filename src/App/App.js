import './App.css';
import TimelinePge from '../pages/Project.jsx';
import BoardCollection from '../Components/BoardCollection/boardCollection.jsx';
import { Provider } from 'react-redux';
import store from '../redux/store/store.js';


function App() {
  return (
    <Provider store={store}>

      <div className="App">
        {/* <TimelinePge></TimelinePge> */}
        <BoardCollection></BoardCollection>
      </div>
    </Provider>
  );
}

export default App;
