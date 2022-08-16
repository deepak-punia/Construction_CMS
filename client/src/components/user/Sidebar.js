import React, { useState } from "react";
import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/auth";
import setAuthToken from "../../utils/setAuthToken";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const handlelogout = () => {
		setAuthToken();
		dispatch(logout());
	};

	if (user.user.role === "user") {
		return (
			<div id="sidebar-container" className="sidebar-container">
				<div className="username">{user.user.username}</div>

				<ul>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li onClick={handlelogout}>Logout</li>
				</ul>
			</div>
		);
	}
	if (user.user.role === "admin") {
		return (
			<div id="sidebar-container" className="sidebar-container">
				<div className="username">{user.user.username}</div>

				<ul>
					<li>
						<Link to="/admin">Dashboard</Link>
					</li>
					<li>
						<Link to="appointments">All Appointments</Link>
					</li>
					<li>
						<Link to="users">All Users</Link>
					</li>
					<li>
						<Link to="settings">Settings</Link>
					</li>
					<li>
						<Link to="reviews">Reviews</Link>
					</li>
					<li>
						<Link to="gridsettings">Grid Settings</Link>
					</li>
					<li>
						<Link to="slidersettings">Slider Settings</Link>
					</li>
					<li onClick={handlelogout}>Logout</li>
				</ul>
			</div>
		);
	}
};

export default Sidebar;
