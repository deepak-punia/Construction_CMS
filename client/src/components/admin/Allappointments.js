import React from "react";
import AptDetails from "../user/AptDetails";
import { useSelector, useDispatch } from "react-redux";

const Allappointments = () => {
  const appointments = useSelector((state) => state.appointments.allapt);

  return (
    <div>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>All Appointments</h2>
        </div>
        <div style={{ display: "flex" }}>
          <AptDetails aptData={appointments} />
          <div id="apt-info-data" className="apt-info-data"></div>
        </div>
      </div>
    </div>
  );
};

export default Allappointments;
