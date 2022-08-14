import React, {useEffect} from 'react';
import './dashboard.css';
import UserNav from './UserNav';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from './Sidebar';
import Appointment from './Appointment';

const Dashboard = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);

    if (!user.isAuthenticated ) {
			navigate("/");
		}
  useEffect(() => {
		if (!user.isAuthenticated && !user?.user?.role === "user") {
			navigate("/");
		}
  
	}, [user]);
  
  return (
    <>
    <UserNav />
    <div className='wrapper-dashboard-container'>
      <Sidebar />
    <div className='dashboard-container'>
      
      <Appointment /></div>
      </div>
      </>
  )
}

export default Dashboard;