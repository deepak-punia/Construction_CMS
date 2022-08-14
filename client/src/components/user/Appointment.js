import React, {useEffect} from "react";
import "./appointment.css";
import { useSelector, useDispatch } from "react-redux";
import { getuserapt, getallapt } from "../../reducers/appointments";
import AptDetails from "./AptDetails";

const Appointment = () => {

	const dispatch = useDispatch();
	const appointments = useSelector((state) => state.appointments);
  const id = useSelector((state) => state.auth.user._id);

  useEffect(()=>{
    dispatch(getallapt());
    dispatch(getuserapt({id}))
  },[]);

  if(appointments.loading){
    return(
      <div className="lalery warning">Loading...</div>
    )
  }
  // if(appointments?.userapt?.length === 0){
  //   return(
  //     <div className="alert info">You don't have any appointment.</div>
  //   )
  // }
	return (
    <>
  <div>
    <AptDetails aptData={appointments.allapt} />
  </div>
    <div>
Book Appointment
  </div>
  </>
  );
};

export default Appointment;
