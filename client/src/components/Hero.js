import React from 'react';
import './hero.css'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero_content">
        <h1>Bluehill Construction</h1>
        <h2>
          We are expert in basements, side entrances, driveway, doors and
          windows.
        </h2>

        <div className="button"><a href="#contact">Book Appointment</a></div>
      </div>
    </div>

  )
}

export default Hero;