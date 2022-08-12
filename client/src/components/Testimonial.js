import React from 'react';
import './testimonial.css';

const Testimonial = ({ data }) => {
  return (
    <div className="testimonial">
      <div className="testimonial-body">
        <p>{data.details}</p>
        <i className="fas fa-quote-right"></i>
      </div>
      <div className="testimonial-footer">
        <h3>{data.name}</h3>
        <h4>{data.position}</h4>
      </div>
    </div>
  );
};

export default Testimonial;
