import React from 'react';
import './model.css';
import Login from './Login';

const Model = () => {
   
    const closeModel = () => {
		const model = document.getElementById("myModal");
        model.style.display="none";
		
	};

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={closeModel} className="close">&times;</span>
        <Login />
      </div>
    </div>
  );
};
export default Model;
