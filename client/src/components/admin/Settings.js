import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const Settings = () => {
  return (
    <div>
        {/* Grid or Slider */}
        <div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Grid OR Slider</h2>
				</div>
      Turn on Grid OR Slider
			</div>
        {/* Promotions */}
            <div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Promotions</h2>
				</div>
            Turn on off promotion.
            EDIT PROMOTION
			</div>
    </div>
  )
}

export default Settings;