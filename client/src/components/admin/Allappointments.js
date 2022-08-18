import React from "react";
import AptDetails from "../user/AptDetails";
import { useSelector, useDispatch } from "react-redux";

const Allappointments = () => {
  const appointments = useSelector((state) => state.appointments.allapt);

  const handCancelclk = () => {
    console.log('runing')
    const info1 = document.getElementById("apt-info-data");
    info1.style.width = "0px";
    
  };

  return (
    <div>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>All Appointments</h2>
        </div>
        <div className="show-apt-data-2" style={{ display: "flex" }}>
          <AptDetails aptData={appointments} />
          <div style={{cursor: 'pointer'}} onClick={handCancelclk} id="apt-info-data" className="apt-info-data"></div>
        </div>
      </div>
    </div>
  );
};

export default Allappointments;
