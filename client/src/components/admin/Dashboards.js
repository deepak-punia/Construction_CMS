import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getallapt } from "../../reducers/appointments";
import AptDetails from "../user/AptDetails";

const Dashboards = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);

  const today = new Date();
  let month = today.getUTCMonth() + 1; //months from 1-12
  let day = today.getUTCDate();
  let year = today.getUTCFullYear();
  let newdate = year + "/" + month + "/" + day;
  const aptToday = appointments?.allapt?.filter((item) => item.apt_date === newdate);

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
          <div id="apt-info-data" className="apt-info-data"></div>
        </div>
      </div>
      <div className="show-apt-data card">
        <div className="show-apt-info">
          <h2>Info</h2>
        </div>
        some infor goes here
      </div>
    </div>
  );
};

export default Dashboards;
