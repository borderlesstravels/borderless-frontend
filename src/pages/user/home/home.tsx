import React, { useEffect, useRef, useState } from 'react';
import './home.scss';
import CreditsSect from './page-modules/credits/credits';
import DestinationsSect from './page-modules/destinations/destinations';
import DownloadsSect from './page-modules/downloads/downloads';
import HeroSect from './page-modules/hero/hero';
import LatestSect from './page-modules/latest/latest';
import ShortletsSect from './page-modules/shortlets/shortlets';
import SubscribeSect from './page-modules/subscribe/subscribe';
import TravelDealsSect from './page-modules/travel-deals/travel-deals';
import WhyChooseSect from './page-modules/why-choose/why-choose';

function About(props: any) {

  useEffect(() => {
    window.scrollTo(0, 0);
  },[props]);
  
  return (
    <div className='home'>
      <HeroSect/>
      <WhyChooseSect/>
      <TravelDealsSect/>
      <DestinationsSect/>
      <ShortletsSect/>
      <CreditsSect/>
      <LatestSect/>
      <DownloadsSect/>
      <SubscribeSect/>
    </div>
  );
}

export default About;
