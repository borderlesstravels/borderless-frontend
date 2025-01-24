import React, { useEffect } from 'react';
import { DealsHeroImage } from '../../../assets/images';
import TravelDealsSect from '../home/page-modules/travel-deals/travel-deals';
import StayLocationDealsSect from '../stays/stay-search/stay-location-deals/stay-location-deals';
import './deals.scss';

function DealsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='deals'>
      <div className='deals-hero page-holder'>
        <div className='hero-grid'>
          <div className='img-holder'>
            <div className='imh'>
              <img src={DealsHeroImage} alt="" />
            </div>
          </div>
          <div className='text-holder'>
            <div className='text-box'>
              <h6 className='pb-4 orange-tx'>TRAVEL THE WORLD</h6>
              <h1>
                <span className='blue-tx'>Explore Travel Deals &</span> 
                <span className='purple-tx'> Take Advantage of curated Offers</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <TravelDealsSect/>
      <StayLocationDealsSect>
        <h3 className='text-center h3b'>Book Stay’s  <span className='purple-tx'> Round the Globe</span></h3>
        <p></p>
      </StayLocationDealsSect>
    </div>
  );
}

export default DealsPage;
