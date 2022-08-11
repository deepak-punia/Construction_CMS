import React, { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './slider.css';
import { API_ENDPOINT } from "../reducers/types";

const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = React.useRef(null);
  const delay = 5000;
  const left = () => {
    const first = current === 0;
    const index = first ? images.length - 1 : current - 1;
    setCurrent(index);
  };
  const right = () => {
    const last = current === images.length - 1;
    const index = last ? 0 : current + 1;
    setCurrent(index);
  };
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => right(), delay);

    return () => {
      resetTimeout();
    };
  }, [current]);
  return (
    <div id="showcase" className="slider">
      <div className="left" onClick={left}>
        <FaAngleLeft />
      </div>
      <div className="right" onClick={right}>
        <FaAngleRight />
      </div>
      <div className="view1">
        <img src={`${API_ENDPOINT}/${images[current].url}`} className="view" />
      </div>
    </div>
  );
};
export default Slider;
