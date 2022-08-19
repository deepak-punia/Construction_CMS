import React, { useState, useEffect } from "react";
import { register , loadUser} from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";
import { setAlert } from "../reducers/alert";
import './register.css';
import { useNavigate } from "react-router-dom";

const Register = ({setShow}) => {
	const navigate = useNavigate();
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		dispatch(register({ name,email,phone, password: pass })).unwrap().then((originalPromiseResult)=>
			{dispatch(loadUser());
			dispatch(setAlert({componentName:'register', alertType:'success', msg:'Registeration Successfull.'}))}
		).catch((e)=>dispatch(setAlert({componentName:'register', alertType:'danger', msg:'Erron in Registeration. Please try again.'})));
			}
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
					<h3>Register</h3>
				</div>
				<div className="contact-bottom">
				<Alerts componentName={"register"} />
					<div className="contact_info">
						{(user.isAuthenticated && user.user) ? <div><button className="button" onClick={gotoDashboard}>
									Go to Dashboard
								</button></div> : <form name="loginform" method="POST" data-netlify="true">
                                <p>
								<input type="text" name="name" placeholder="Username"  value={name} 
                                onChange={(e) => setName(e.target.value)}/>
							</p>
                            <p>
								<input type="email" name="email" placeholder="Email"  value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
							</p>
							<p>
								<input type="text" name="phone" placeholder="Phone"  value={phone} 
                                onChange={(e) => setPhone(e.target.value)}/>
							</p>
							<p>
								<input type="password" name="pass" placeholder="Password" value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                />
							</p>
							
							<p>
								<button className="button" onClick={handleRegisterSubmit}>
									Register
								</button>
							</p>
                            <p>Already have account?<div className="register-button" onClick={()=>{setShow(true)}}>
									Login
								</div></p>
						</form>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
