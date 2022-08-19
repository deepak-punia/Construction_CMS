import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../reducers/settings";
import {loadData} from '../../reducers/customSettings'

const AddReview = () => {
    const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [details, setDetails] = useState("");

  const handleReviewUpdate = () => {
    dispatch(addReview({name,details,position })).unwrap()
    .then((originalPromiseResult) => {
      dispatch(loadData())
      setName("")
      setDetails("")
      setPosition("")
      console.log('ok')
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log('error in handleReviewUpdate');
    })
    
  };
  return (
    <div className="display-review-container ">
      <div className="display-review-name">
        <p>
          <input
            type="text"
            name="name"
            value={name}
            maxLength={15}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </p>
      </div>
      <div className="display-review-position">
        <p>
          <input
            type="text"
            name="position"
            value={position}
            maxLength={20}
            placeholder="Position"
            onChange={(e) => setPosition(e.target.value)}
          />
        </p>
      </div>
      <div className="display-review-details">
        <p>
          <input
            type="text"
            name="details"
            value={details}
            placeholder="Details"
            maxLength={200}
            onChange={(e) => setDetails(e.target.value)}
          />
        </p>
      </div>
      <div className="display-review-button">
        <button className="select-button" onClick={handleReviewUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default AddReview;