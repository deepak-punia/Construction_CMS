import React, {useEffect} from 'react';
import './admindashboard.css';
import UserNav from '../user/UserNav';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from '../user/Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    
    if (!user.isAuthenticated ) {
			navigate("/");
		}
  useEffect(() => {
		if (!user.isAuthenticated && !user?.user?.role === "admin") {
			navigate("/");
		}
    
	}, [user]);
  return (
    <>
    <UserNav />
    <div className='wrapper-dashboard-container'>
      <Sidebar />
    <div className='dashboard-container'>
      
      Admin Dashboard</div>
      </div>
      </>
  )
}

export default AdminDashboard;