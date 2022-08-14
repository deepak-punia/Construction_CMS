import './alert.css';
import { useSelector, useDispatch } from "react-redux";
const Alerts = ({ componentName }) => {
	const alert = useSelector((state) => state.alert);

	return (
		alert !== null &&
		alert.length > 0 &&
		alert.map((item) => (
			<>
				{item.componentName === componentName ? (
					<div key={item.id} className="alert">
						
								<div  className={item.alertType}>
									{item.msg}
								</div>
							
					</div>
				) : (
					<></>
				)}
			</>
		))
	);
};

export default Alerts;