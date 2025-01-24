import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Carousel } from '../../../../../components/block-components/carousel';
import { offersData } from './offers-data';
import './offers.scss';

function OffersSect() {

  // const previewCount = () => {
  //   const width = window.innerWidth;
  //   if(width > 1100) {
  //     return 2;
  //   } else if(width > 767) {
  //     return 1;
  //   } else if(width > 550) {
  //     return 1;
  //   } else {
  //     return 1;
  //   }
  // }
  const previewCount = () => {
    const width = window.innerWidth;
    if(width > 1100) {
      return 2;
    } else {
      return 1;
    }
  }

  const shortletCarousel = offersData.map((data, index) => {
    return <div className='deal-case' key={index}>
      <div className='deal-card'>
        <div className='img-sect' style={{backgroundImage: `url(${data.image})`}}>
          <div className='imh'>
            <img src={data.image} alt="" />
          </div>
        </div>
        <div className='text-sect'>
          <div className=''>
            <p className='reduced-soft fainter-tx mb-2'>{data.intro}</p>
            <h6 className='f700'>{data.title}</h6>
            <p className='reduced-soft fainter-tx mb-3'>{data.description}</p>
          </div>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  });

  const viewDetails = (id: number) => {
    console.log({deal_id: id});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className='offers'>
      <div>
        <h3 className='h3b text-center'>Offers</h3>
        <div className='side-margin'>
        <Carousel
            loop
            autoPlay
            delay={6000}
            freeMode
            slidesPerView={previewCount()}
            spaceBetween={0}
            data={shortletCarousel}
            navigation={false}
            pagination={false}
            customPagination={true}
        />
        </div>
      </div>
    </div>
  );
}

export default OffersSect;
