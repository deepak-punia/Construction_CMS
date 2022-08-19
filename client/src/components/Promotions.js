import React, { useState } from "react";
import "./promotions.css";
import { useSelector } from "react-redux";

const Promotions = () => {
    const [show, setShow]= useState(true);
  const promo = useSelector((state) => state?.settings?.data?.promotions);
  const promoTitle = useSelector((state) => state?.settings?.data?.promotitle);
  const promoDetails = useSelector(
    (state) => state?.settings?.data?.promodetails
  );

  const hidePromotions=()=>{
    setShow(false);
  }
  return (
    <>
      {promo === "off" || !show ? (
        <></>
      ) : (
        <div className="promotion-container">
          <div className="promotion-title">{promoTitle}</div>
          <div className="promotion-details">{promoDetails}</div>
          <div className="promotion-close" onClick={hidePromotions}>&times;</div>
        </div>
      )}
    </>
  );
};

export default Promotions;
