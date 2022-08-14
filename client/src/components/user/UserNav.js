import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/auth";
import setAuthToken from "../../utils/setAuthToken";

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
	const sidebarcontrolleropen = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.width = "250px";
		nav.style.display = "flex";
		setsidebar(true);
	};

	const sidebarcontrollerclose = () => {
		const nav = document.getElementById("sidebar-container");

		nav.style.width = "0px";
		nav.style.display = "none";
		setsidebar(false);
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
						&times;
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
