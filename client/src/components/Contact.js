import React from 'react';
import './contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
        <div className="contact-top"><h3>Contact</h3></div>
        <div className="contact-bottom">
        <div class="contact_info">
        <ul>
          <li>
            <i class="fa fa-envelope"></i>
            samarbatth879@gmail.com
          </li>
          <li>
            <i class="fa fa-phone"></i>
            (437) 881-0466
          </li>
          <li>
            <i class="fa fa-building"></i>
            <p>Grater Toronto Area</p>
          </li>
        </ul>
      </div>
        </div>
      </div>
  )
}

export default Contact;