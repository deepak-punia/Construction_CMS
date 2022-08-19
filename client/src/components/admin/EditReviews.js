import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import AddReview from './AddReview';
import DisplayReviews from './DisplayReviews';
import Alerts from '../Alerts';

const EditReviews = () => {
  const reviews = useSelector((state)=>state.settings.data.reviews);
  return (
    <div>
        <div className="show-apt-data card">
				<div className="show-apt-header">
					<h2>Reviews</h2>
				</div>
        <div className='reviews-edit-container'>
        {reviews?.map((item,index)=>{
          return(
            <div key={index}>
              <DisplayReviews review={item} />
            </div>
            
          )
        })}
        <div><AddReview /></div>
      </div>
      <Alerts componentName={"review"} />
			</div>

            <div className="show-apt-data card">
				<div className="show-apt-info">
					<h2>Info</h2>
				</div>
        <div className="information-section">
          <span><i class="fa fa-info-circle"></i> Click on a Delete to delete a review.</span>
          <span><i class="fa fa-info-circle"></i> Fill out Name, Position and Details and click on Add button to add a review.</span>
          <span><i class="fa fa-info-circle"></i> Characters limit for Name is 30.</span>
          <span><i class="fa fa-info-circle"></i> Characters limit for Position is 30.</span>
          <span><i class="fa fa-info-circle"></i> Characters limit for Details is 200.</span>
        </div>
			</div>
    </div>
    
  )
}

export default EditReviews;