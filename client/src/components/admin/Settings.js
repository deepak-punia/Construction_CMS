import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePicturesStyles, togglePromotions,updatePromo } from "../../reducers/settings";
import { setAlert } from "../../reducers/alert";
import Alerts from '../Alerts';

const Settings = () => {
	const dispatch = useDispatch();


  //pictures display style
	const radiovalue = useSelector((state) => state.settings.data.picturestyle);
	const [radio, setRadio] = useState(radiovalue ? radiovalue : null);
	const handleRadioUpdate = () => {
		dispatch(updatePicturesStyles({ style: radio })).unwrap()
		.then((originalPromiseResult) => {
			dispatch(setAlert({componentName:'updatePicturesStyles', alertType:'success', msg:'Settings are updated.'}));
		})
		.catch((rejectedValueOrSerializedError) => {
		  // handle error here
		  dispatch(setAlert({componentName:'updatePicturesStyles', alertType:'danger', msg:'Erron. Please try again.'}));
		});
	};

  //promotion toggle ON/OFF
  const radiovalue1 = useSelector((state) => state.settings.data.promotions);
	const [radio1, setRadio1] = useState(radiovalue1 ? radiovalue1 : null);
	const handleRadioUpdate1 = () => {
		dispatch(togglePromotions({ style: radio1 })).unwrap()
		.then((originalPromiseResult) => {
			dispatch(setAlert({componentName:'handleRadioUpdate1', alertType:'success', msg:'Settings are updated.'}));
		})
		.catch((rejectedValueOrSerializedError) => {
		  // handle error here
		  dispatch(setAlert({componentName:'handleRadioUpdate1', alertType:'danger', msg:'Erron. Please try again.'}));
		});
	};

	const promovalue = useSelector((state) => state.settings.data);
	const [title, setTitle] = useState(promovalue ? promovalue.promotitle : null);
	const [details, setDetails] = useState(promovalue ? promovalue.promodetails : null);

	const handlePromoUpdate=()=>{
		dispatch(updatePromo({title,details})).unwrap()
		.then((originalPromiseResult) => {
			dispatch(setAlert({componentName:'handlePromoUpdate', alertType:'success', msg:'Settings are updated.'}));
		})
		.catch((rejectedValueOrSerializedError) => {
		  // handle error here
		  dispatch(setAlert({componentName:'handlePromoUpdate', alertType:'danger', msg:'Erron. Please try again.'}));
		});
	}
	return (
		<div>
			{/* Grid or Slider */}
			<div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Grid OR Slider</h2>
				</div>
				<Alerts componentName={"updatePicturesStyles"} />
				<div className="settings-container">
					<label class="radio-container">
						Grid
						<input
							type="radio"
							checked={radio === "grid"}
							name="radio"
							onClick={() => setRadio("grid")}
						/>
						<span class="checkmark"></span>
					</label>
					<label class="radio-container">
						Slider
						<input
							type="radio"
							checked={radio === "slider"}
							name="radio"
							onClick={() => setRadio("slider")}
						/>
						<span class="checkmark"></span>
					</label>
					<button class="select-button" onClick={handleRadioUpdate}>
						Update
					</button>
				</div>
			</div>
			{/* Promotions */}
			<div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Promotions</h2>
				</div>
				<Alerts componentName={"handleRadioUpdate1"} />
				<div className="settings-container">
					<label class="radio-container">
						ON
						<input
							type="radio"
							checked={radio1 === "on"}
							name="radio1"
							onClick={() => setRadio1("on")}
						/>
						<span class="checkmark"></span>
					</label>
					<label class="radio-container">
						OFF
						<input
							type="radio"
							checked={radio1 === "off"}
							name="radio1"
							onClick={() => setRadio1("off")}
						/>
						<span class="checkmark"></span>
					</label>
					<button class="select-button" onClick={handleRadioUpdate1}>
						Update
					</button>
				</div>
			</div>

			{/* Promotiona Update Details */}
			<div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Promotion Details</h2>
				</div>
				<Alerts componentName={"handlePromoUpdate"} />
				<div className="promo-info">
				<p>
								<input type="text" name="title"  value={title} maxLength="20"
                                onChange={(e) => setTitle(e.target.value)}/>
							</p>
							<p>
								<input type="text" name="details"  value={details} maxLength="50"
                                onChange={(e) => setDetails(e.target.value)}
                                />
							</p>
							
							<p>
								<button className="select-button" onClick={handlePromoUpdate}>
									Update
								</button>
							</p>
				</div>
			</div>
		</div>
	);
};

export default Settings;
