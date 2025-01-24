import React, { useEffect } from 'react';
import './travel-on-credit.scss';

function TravelOnCreditPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='travel-on-credit'>
      <div className='banner'>
        <h1>TravelOnCredit Page</h1>
      </div>
    </div>
  );
}

export default TravelOnCreditPage;
