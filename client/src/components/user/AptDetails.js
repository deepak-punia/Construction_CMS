import React from "react";
import "./aptdetails.css";
import { deleteapt, getuserapt, getallapt } from "../../reducers/appointments";
import { getUserWithId } from "../../reducers/settings";
import { useSelector, useDispatch } from "react-redux";

const AptDetails = ({ aptData }) => {
	const user_id = useSelector((state) => state.auth.user._id);
	const id1 = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	if (!aptData) {
		return <div className="alert info">You don't have any appointment.</div>;
	}
	if (aptData.length === 0) {
		return <div className="alert info">You don't have any appointment.</div>;
	}
	const info = document.getElementById("apt-info-data");
	info.innerHTML = id1.loading
		? "<h2>Loading...</h2>"
		: `<div>${id1?.userdetails?.username}</div><div>${id1?.userdetails?.phone}</div>`;
	const handeaptClick = (id) => {
		console.log("ok");
		const info1 = document.getElementById("apt-info-data");
		info1.style.width = "150px";
		dispatch(getUserWithId({ id }));
	};

	//handle cancelation of appointment
	const handleCanel = (id) => {
		dispatch(deleteapt({ id }))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(getuserapt({ id: user_id }));
				dispatch(getallapt());
			})
			.catch((e) => console.log(e));
	};

	//Time formmating to display to user in readable format
	const formattime = (time) => {
		const formatedtime = time.split("/");
		return formatedtime;
	};

	//Date formmating to display to user in readable format
	const formattingDate = (getdate) => {
		const a = new Date(getdate);
		const formatedDate = a.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formatedDate;
	};

	return (
		<div className="aptDetails">
			<table>
				<tr>
					<th>Appointment Date</th>
					<th>Appointment Time</th>
					<th>More Details</th>
				</tr>

				{aptData.map((item, index) => {
					const readableDate = formattingDate(item.apt_date);
					const readableTime = formattime(item.apt_time);
					return (
						<tr key={index}>
							<td onClick={() => handeaptClick(item.user)}>{readableDate}</td>
							<td>{readableTime[0] + ":" + readableTime[1]}</td>
							<td>
								<div
									style={{ cursor: "pointer" }}
									onClick={() => handleCanel(item._id)}
								>
									&times; Cancel
								</div>
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default AptDetails;
