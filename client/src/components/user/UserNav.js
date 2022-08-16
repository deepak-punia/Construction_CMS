import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/auth";
import setAuthToken from "../../utils/setAuthToken";
import './usenav.css';

const UserNav = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);

	const handlelogout = () => {
		setAuthToken();
		dispatch(logout());
	};

	//sidebar Controller
	const [sidebar, setsidebar] = useState(true);
	const [sidebarMobile, setsidebarMobile] = useState(false);
	const sidebarcontrolleropen = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.minWidth = "250px";

		setsidebar(true);
	};

	const sidebarcontrollerclose = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.minWidth = "0px";
	
		setsidebar(false);
	};

	//mobile view
	const sidebarcontrolleropen1 = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.height = "auto";

		setsidebarMobile(true);
	};

	const sidebarcontrollerclose1 = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.height = "0px";
	
		setsidebarMobile(false);
	};

	return (
		<>
			<nav id="header" className="header">

				{sidebar ? (
					<span
						className="sidebar-control-button"
						style={{ fontSize: "35px", cursor: "pointer" }}
						onClick={sidebarcontrollerclose}
					>
						&#9776;
					</span>
					
				) : (
					
					<span
						className="sidebar-control-button"
						style={{ fontSize: "30px", cursor: "pointer" }}
						onClick={sidebarcontrolleropen}
					>
						&#9776;
					</span>
					
				)}
				{sidebarMobile ? (
					<span
					className="sidebar-control-button1"
					style={{ fontSize: "35px", cursor: "pointer" }}
					onClick={sidebarcontrollerclose1}
				>
					&#9776;
				</span>
				) : (
					
					<span
						className="sidebar-control-button1"
						style={{ fontSize: "30px", cursor: "pointer" }}
						onClick={sidebarcontrolleropen1}
					>
						&#9776;
					</span>
				)}
				<div className="logo">Bluehill</div>

				<div className="nav">
					<Link to="/">Home </Link>
					<Link to="#" onClick={handlelogout}>
						Logout{" "}
					</Link>
				</div>
			</nav>
		</>
	);
};

export default UserNav;
