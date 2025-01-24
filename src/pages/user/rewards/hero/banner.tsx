import React, { useEffect } from 'react';
import './banner.scss';

function BannerSect() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className='banner-band'>
      <div className='text-center'>
        <h1 className='f700'>Available Rewards</h1>
      </div>
    </div>
  );
}

export default BannerSect;
