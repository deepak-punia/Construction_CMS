import React, { useState, useEffect } from "react";
import { login , loadUser} from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";
import { setAlert } from "../reducers/alert";
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password: pass })).unwrap().then((originalPromiseResult)=>
			dispatch(loadUser())
		).catch((e)=>console.log(e));
	};
	const gotoDashboard = (e) => {
		e.preventDefault();
		if (user.isAuthenticated && user.user?.role === "user") {
			navigate("dashboard");
		}
		if (user.isAuthenticated && user.user?.role === "admin") {
			navigate("admin");
		}
	};
    
	// dispatch(setAlert({componentName:'login', alertType:'success', msg:'Login'}))
	return (
		<>
			<Alerts componentName={"login"} />
			<div className="contact-container">
				<div className="contact-top">
					<h3>Contact</h3>
				</div>
				<div className="contact-bottom">
					<div className="contact_info">
						{(user.isAuthenticated && user.user) ? <div><button className="button" onClick={gotoDashboard}>
									Go to Dashboard
								</button></div> : <form name="loginform" method="POST" data-netlify="true">
							<p>
								<input type="email" name="email" placeholder="email"  value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
							</p>
							<p>
								<input type="text" name="pass" placeholder="password" value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                />
							</p>
							
							<p>
								<button className="button" onClick={handleLoginSubmit}>
									Login
								</button>
							</p>
						</form>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
