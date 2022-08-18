import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import AddReview from './AddReview';
import DisplayReviews from './DisplayReviews';

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
			</div>

            <div className="show-apt-data card">
				<div className="show-apt-info">
					<h2>Info</h2>
				</div>
      some info about reviews.
			</div>
    </div>
    
  )
}

export default EditReviews;