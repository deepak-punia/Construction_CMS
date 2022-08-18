import React from "react";
import "./displayreviews.css";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../reducers/settings";
import { loadData } from "../../reducers/customSettings";

const DisplayReviews = ({ review }) => {
  const dispatch = useDispatch();
  const handleReviewDelete = (id) => {
    dispatch(deleteReview({ id }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log("error in handleReviewUpdate");
      });
  };
  return (
    <div className="display-review-container ">
      <div className="display-review-name">{review.name}</div>
      <div className="display-review-position">{review.position}</div>
      <div className="display-review-details">{review.details}</div>
      <div className="display-review-button">
        <button
          className="select-button"
          onClick={() => handleReviewDelete(review._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DisplayReviews;
