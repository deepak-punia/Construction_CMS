import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadData} from './reducers/customSettings';
import {setAlert, removeAlert} from './reducers/alert'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadData());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      
    </div>
  );
}

export default App;
