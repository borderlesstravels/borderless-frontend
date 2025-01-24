import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { HomeTravelOnCredit1, HomeTravelOnCredit2, HomeTravelOnCredit3 } from '../../../../../assets/images';
import './credits.scss';

function CreditsSect() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='rental'>
        <div className='rental-card'>
          <div className='gradient'>
            <div className='text-holder'>
              <h3 className='h3b'>Car Rentals</h3>
                <p>Find and compare the best car rental deals</p>
                <button> <FontAwesomeIcon icon={'paper-plane'} className='icon' /> Search deals</button>
            </div>
          </div>
        </div>
      </div>
      <div className='credits'>
        <div className='separator'>
          <div className='text-side'>
            <div className='texts'>
              <h3 className='h3b'>Travel On <span className='orange-tx'> Credit</span></h3>
              <div className='divider'></div>
              <p>
                Through the TravelOnCredit service, we are redefining the way high net worth 
                individuals and esteemed corporate organizations experience travel.
              </p>
              <div className='styled-button'>
                <div className='top-cube'></div>
                <button>Learn more</button>
                <div className='bottom-cube'></div>
              </div>
            </div>
          </div>
          <div className='image-side'>
            <div className='floater bottom-float'>
              <img src={HomeTravelOnCredit1} alt="" data-aos="fade-up" data-aos-delay="600" />
            </div>
            <div className='floater top-float'>
              <img src={HomeTravelOnCredit2} alt="" data-aos="fade-down" data-aos-delay="600" />
            </div>
            <div className='floater bottom-float2'>
              <img src={HomeTravelOnCredit3} alt="" data-aos="fade-up" data-aos-delay="600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditsSect;
