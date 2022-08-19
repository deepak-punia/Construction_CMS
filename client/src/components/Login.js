import React, { useState, useEffect } from "react";
import { login , loadUser} from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";
import { setAlert } from "../reducers/alert";
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = ({setShow}) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password: pass })).unwrap().then((originalPromiseResult)=>
			{dispatch(loadUser());
				dispatch(setAlert({componentName:'login', alertType:'success', msg:'Logged in.'}));}
		).catch((e)=>dispatch(setAlert({componentName:'login', alertType:'danger', msg:'Erron in Login. Please try again.'})));
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
			
			<div className="contact-container">
				<div className="contact-top">
					<h3>Login</h3>
				</div>
				<div className="contact-bottom">
				<Alerts componentName={"login"} />
					<div className="contact_info">
						{(user.isAuthenticated && user.user) ? <div><button className="button" onClick={gotoDashboard}>
									Go to Dashboard
								</button></div> : <form name="loginform" method="POST" data-netlify="true">
							<p>
								<input type="email" name="email" placeholder="Email"  value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
							</p>
							<p>
								<input type="password" name="pass" placeholder="Password" value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                />
							</p>
							
							<p>
								<button className="button" onClick={handleLoginSubmit}>
									Login
								</button>
								
							</p>
							<p>Don't have account?<div className="register-button" onClick={()=>{setShow(false)}}>
									Register
								</div></p>
						</form>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
