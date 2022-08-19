import React, { useState } from 'react';
import './model.css';
import Login from './Login';
import Register from './Register';

const Model = () => {
    const [login, setLogin] = useState(true);
   
    const closeModel = () => {
		const model = document.getElementById("myModal");
        model.style.display="none";
		
	};

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={closeModel} className="close">&times;</span>
        {login ? <Login setShow={setLogin}/>: <Register setShow={setLogin}/>} 
        
      </div>
    </div>
  );
};
export default Model;
