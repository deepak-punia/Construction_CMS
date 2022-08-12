import React from 'react';
import './model.css';
import Appointment from './Appointment';

const Model = () => {
   
    const closeModel = () => {
		const model = document.getElementById("myModal");
        model.style.display="none";
		
	};

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={closeModel} className="close">&times;</span>
        <Appointment />
      </div>
    </div>
  );
};
export default Model;
