import React from 'react';
import './hero.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const displayModel = () => {

    if (user.isAuthenticated && user.user?.role === "user") {
			navigate("dashboard");
		}
		if (user.isAuthenticated && user.user?.role === "admin") {
			navigate("admin");
		}

		const model = document.getElementById("myModal");
    model.style.display="block";
		
	};
  return (
    <div className="hero">
      <div className="hero_content">
        <h1>Bluehill Construction</h1>
        <h2>
          We are expert in basements, side entrances, driveway, doors and
          windows.
        </h2>

        <div onClick={displayModel} className="button">Book Appointment</div>
      </div>
    </div>

  )
}

export default Hero;