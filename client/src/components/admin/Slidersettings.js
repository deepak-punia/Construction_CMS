import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const Slidersettings = () => {
  return (
    <div>
        <div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Slider Pictures</h2>
				</div>
      Upload Slider pictures
			</div>

            <div className="show-apt-data card">
				<div className="show-apt-info">
					<h2>Info</h2>
				</div>
      info here
			</div>
    </div>
  )
}

export default Slidersettings;