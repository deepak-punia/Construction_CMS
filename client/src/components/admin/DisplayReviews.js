import React from "react";
import "./displayreviews.css";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../reducers/settings";
import { loadData } from "../../reducers/customSettings";
import { setAlert } from "../../reducers/alert";

const DisplayReviews = ({ review }) => {
  const dispatch = useDispatch();
  const handleReviewDelete = (id) => {
    dispatch(deleteReview({ id }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
        dispatch(setAlert({componentName:'review', alertType:'success', msg:'Review Deleted'}));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        dispatch(setAlert({componentName:'review', alertType:'danger', msg:'Erron. Please try again.'}));
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
