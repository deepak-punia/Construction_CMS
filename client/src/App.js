import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadData} from './reducers/customSettings';
import {setAlert, removeAlert} from './reducers/alert'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadData());
    dispatch(setAlert({
			msg:"msg",
			alertType:"alerttype",
			componentName: "app",
			id:"10",
		}));
  }, []);
  return (
    <div className="App">
      Starting
      <button onClick={()=>dispatch(setAlert({
			msg:"msg",
			alertType:"alerttype",
			componentName: "app",
			id:"11",
		}))}>Dispatch</button>
    <button onClick={()=>dispatch(removeAlert({
			
			id:"11"
		}))}>Dispatch removeAlert</button>
    </div>
  );
}

export default App;
