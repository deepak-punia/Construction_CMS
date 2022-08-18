import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers, deleteUser} from '../../reducers/settings';

const Allusers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.allusers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handeDeleteUserClick=(id)=>{
    dispatch(deleteUser({id})).unwrap().then(()=>{
      dispatch(getAllUsers());
    })
  }
  return (
    <div>
        <div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>All Users</h2>
				</div>
        <div className="aptDetails">
      <table>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>

        {users?.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}
              </td>
              <td style={{cursor: 'pointer'}} onClick={() => handeDeleteUserClick(item._id)}>X</td>
            </tr>
          );
        })}
      </table>
    </div>
			</div>
    </div>
  )
}

export default Allusers;