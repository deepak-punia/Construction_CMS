import React from 'react';
import './feature.css';

const Features = () => {
  return (
    <div id="features" className="features">
      <div className="info">
        <div className="card">
          <div className="card_1">
            <h2>135</h2>
            <p>Happy Customers</p>
          </div>
          <div className="card_1">
            <h2>230</h2>
            <p>Projects Completed</p>
          </div>
          <div className="card_1">
            <h2>10+</h2>
            <p>Cities covered</p>
          </div>
        </div>
      </div>
      <div className='typer'>We build <div><ul><li>Side entrances.</li><li>basements.</li><li>driveways.</li>doors and windows.</ul></div></div>
      <div className="features_content">
        <div className="feature_1 card">
          <img src="/17.jpg" alt="doors" style={{width: "100%"}} />

          <h3>Side entrances</h3>
          <p>
            We build side entraces.<br />
            Contact us for quote.
          </p>
        </div>
        <div className="feature_2 card">
          <img src="/18.jpg" alt="windows" style={{width: "100%"}} />
          <h3>Doors</h3>
          <p>
            We build and install custom doors.<br />
            Contact us for quote.
          </p>
        </div>
        <div className="feature_3 card">
          <img src="/19.jpg" alt="entrances" style={{width: "100%"}} />
          <h3>Windows</h3>
          <p>
            We build and install custom doors.<br />
            Contact us for quote.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Features;