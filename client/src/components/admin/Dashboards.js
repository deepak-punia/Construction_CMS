import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getallapt } from "../../reducers/appointments";
import AptDetails from "../user/AptDetails";

const Dashboards = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);

  const today = new Date();
  let month = today.getMonth() + 1; //months from 1-12
  let day = today.getDate();
  let year = today.getFullYear();
  let newdate = year + "/" + month + "/" + day;
  
  const aptToday = appointments?.allapt?.filter((item) => item.apt_date === newdate);

  const handCancelclk = () => {
    const info1 = document.getElementById("apt-info-data");
    info1.style.width = "0px";
    
  };

  useEffect(() => {
    dispatch(getallapt());
  }, []);
  return (
    <div>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>Appointments Today</h2>
        </div>

        <div style={{ display: "flex" }}>
          <AptDetails aptData={aptToday} />
          <div style={{cursor: 'pointer'}} onClick={handCancelclk} id="apt-info-data" className="apt-info-data"></div>
        </div>
      </div>
      <div className="show-apt-data card">
        <div className="show-apt-info">
          <h2>Info</h2>
        </div>
        <div className="information-section">
          <span><i class="fa fa-info-circle"></i> Click on a appointment to display appointment details.</span>
          <span><i class="fa fa-info-circle"></i> Click on appointment details to hide details.</span>
          <span><i class="fa fa-info-circle"></i> Click on cancel to delete appointment.</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;
