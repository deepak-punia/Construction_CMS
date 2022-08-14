import React from 'react';
import './aptdetails.css'

const AptDetails = ({aptData}) => {
  return (
    <div className='aptDetails'>

<table>
  <tr>
    <th>Appointment Date</th>
    <th>Appointment Time</th>
    <th>More Details</th>
  </tr>
  
  {aptData.map((item)=>{
    return(
<tr>
    <td>{item.apt_date}</td>
    <td>{item.apt_time}</td>
    <td>Details</td>
  </tr>
    )
  })}
</table>
    </div>
  )
}

export default AptDetails;