import React from "react";
import "./grid.css";
import { API_ENDPOINT } from "../reducers/types";

const Grid = ({ images }) => {
	return (
		<div id="showcase" className="grid-container">
			{images.map((item, index) => {
				return (
					<div key={index} className={`img`+(index+1)}>
						<img
							src={`${API_ENDPOINT}/${item.url}`}
						/>
					</div>
				);
			})}
		</div>
	);
};
export default Grid;
