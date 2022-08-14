import React from "react";

import "./navbar.css";

const Navbar = () => {
	const navcontrolleropen = () => {
		const nav = document.getElementById("mySidenav");

		nav.style.width = "300px";
		nav.style.boxShadow = "0 0 8px 10px rgba(0,0,0,0.2)";
	};

	const navcontrollerclose = () => {
		const nav = document.getElementById("mySidenav");

		nav.style.width = "0px";
		nav.style.boxShadow = "none";
	};

	return (
		<>
			<nav id="header" className="header">
				<div className="logo">Bluehill</div>

				<div className="nav">
					<a href="#">Home </a>

					<a href="#features">Features </a>

					<a href="#showcase">Projects </a>

					<a href="#reviews">Reviews </a>

					<a href="#contact">Contact </a>
				</div>
				<div id="sideNavbar" className="sideNavbar">
					<span
						style={{ fontSize: "30px", cursor: "pointer" }}
						onClick={navcontrolleropen}
					>
						&#9776;
					</span>

					<div id="mySidenav" className="sidenav">
						<a href="#" className="closebtn" onClick={navcontrollerclose}>
							&times;
						</a>

						<div className="nav">
							<a href="#" onClick={navcontrollerclose}>
								Home{" "}
							</a>

							<a href="#features" onClick={navcontrollerclose}>
								Features{" "}
							</a>

							<a href="#showcase" onClick={navcontrollerclose}>
								Projects{" "}
							</a>

							<a href="#reviews" onClick={navcontrollerclose}>
								Reviews{" "}
							</a>

							<a href="#contact" onClick={navcontrollerclose}>
								Contact{" "}
							</a>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
