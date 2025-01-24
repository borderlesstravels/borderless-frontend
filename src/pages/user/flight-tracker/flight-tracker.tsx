import React, { useEffect } from 'react';
import { FlightTrackerBg } from '../../../assets/images';
import './flight-tracker.scss';

function FlightTrackerPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='flight-tracker page-holder'>
      <div className='w90 max1200'>
        <div className='row relative'>
          <div className='col-lg-6 col-md-4'></div>
          <div className='floating-bg'>
            <img src={FlightTrackerBg} alt="" />
          </div>
          <div className='col-lg-6 col-md-8'>
            <div className='tracking-card relative'>
              <h4 className='purple-tx f700 pb-4'>Flight Number <span className='px-3'></span> Airport</h4>
              <input type="text" name="" placeholder='Airline' id="" />
              <input type="text" name="" placeholder='Flight Number' id="" />
              <input type="text" name="" placeholder='Sat 10/7' id="" />
              <button>Track Flight</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightTrackerPage;
