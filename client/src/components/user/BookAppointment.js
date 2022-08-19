import React, { useState } from "react";
import "./bookappointment.css";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { adduserapt,getuserapt, getallapt } from "../../reducers/appointments";
import { setAlert } from "../../reducers/alert";
import Alerts from '../Alerts';


const BookAppointment = () => {
  const appointments = useSelector((state) => state.appointments);
  const id = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  // Time List
  const apt = appointments.allapt;

  const formattime = (time) => {
    const formatedtime = time.split("/");
    return formatedtime;
  };
  // Date formatting
  let month = startDate.getUTCMonth() + 1; //months from 1-12
  let day = startDate.getUTCDate();
  let year = startDate.getUTCFullYear();
  var minutes = startTime.getMinutes();
  var hour = startTime.getHours();

  let newdate = year + "/" + month + "/" + day;
  
  //excluding dates from select date callender
  //const a = new Date("2022/8/19");

  //get time for specific date
  const findtime = (date) => {
    const temp = apt.filter((item) => item.apt_date === date);
    return temp;
  };

  //get times to exclude
  const getexcludeTime = () => {
    const data = findtime(newdate);
    const exclude = data.map((item) => {
      const temp = formattime(item.apt_time);
      return setHours(setMinutes(new Date(), temp[1]), temp[0]);
    });
    return exclude;
  };
  let excludeTime = getexcludeTime();

  //Add appointment
  const addApt = () => {
    dispatch(adduserapt({ apt_time: hour + "/" + minutes, apt_date: newdate })).unwrap().then((originalPromiseResult)=>
    {dispatch(getuserapt({id}))
    dispatch(getallapt())
    dispatch(setAlert({componentName:'apt', alertType:'success', msg:'Appointment is Confirmed.'}));}
).catch((e)=>dispatch(setAlert({componentName:'apt', alertType:'danger', msg:'Erron in booking appointment. Please try again.'})));
   
  };
  return (
    <>
    <Alerts componentName={"apt"} />
    <div className="bookappointment-body">
      
      <div className="item-1">
      <DatePicker
        wrapperClassName="date_picker full-width"
        selected={startDate}
        dateFormat="yyyy/MM/dd"
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        //excludeDates={[new Date(), a]}
        placeholderText="Select a date other than today or yesterday"
      />
      </div>
      <div className="item-2">
      <DatePicker
        wrapperClassName="date_picker full-width"
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        excludeTimes={excludeTime}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      </div>
      <div className="item-3">
      <button class="select-button" onClick={addApt}>Add appointment</button>
      </div>
      

      


    </div></>
  );
};

export default BookAppointment;
