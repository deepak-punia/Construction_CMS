import React, { useEffect } from "react";
import "./appointment.css";
import { useSelector, useDispatch } from "react-redux";
import { getuserapt, getallapt } from "../../reducers/appointments";
import AptDetails from "./AptDetails";
import BookAppointment from "./BookAppointment";

const Appointment = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const id = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    dispatch(getallapt());
    dispatch(getuserapt({ id }));
  }, []);

  if (appointments.loading) {
    return <div className="lalery warning">Loading...</div>;
  }

  const handCancelclk = () => {
    console.log('runing')
    const info1 = document.getElementById("apt-info-data");
    info1.style.width = "0px";
    
  };

  return (
    <>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>Confirmed Appointment</h2>
        </div>

        <div className="show-apt-data-2" style={{ display: "flex" }}>
          <AptDetails aptData={appointments.userapt} />
          <div
          style={{cursor: 'pointer'}}
            onClick={handCancelclk}
            id="apt-info-data"
            className="apt-info-data"
          ></div>
        </div>
      </div>
      <div className="bookappointment-container card">
        <div className="show-apt-header">
          <h2>Book Appointment</h2>
        </div>
        <BookAppointment />
      </div>
    </>
  );
};

export default Appointment;
