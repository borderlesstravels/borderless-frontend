import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Carousel } from '../../../../../components/block-components/carousel';
import { shortletsData } from './shortlets-data';
import './shortlets.scss';

function ShortletsSect() {

  const previewCount = () => {
    const width = window.innerWidth;
    if(width > 1100) {
      return 4;
    } else if(width > 767) {
      return 3;
    } else if(width > 550) {
      return 2;
    } else {
      return 1;
    }
  }

  const shortletCarousel = shortletsData.map((data, index) => {
    return <div className='deal-case' key={index}>
      <div className='deal-card'>
        <div className='img-sect'>
          <div className='imh'>
            <img src={data.image} alt="" />
          </div>
        </div>
        <div className='text-sect'>
          <div className='spread-info'>
            <p><FontAwesomeIcon icon={'map-marker-alt'} className='icon orange-tx' /> {data.location}</p>
            <p>${data.cost}k/year</p>
          </div>
          <div className='spread-info mt-2'>
            <p className='px-2'>{data.description}</p>
            <p className='highlighted number-light clickable' onClick={() => viewDetails(index)}>View More</p>
          </div>
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
    <div className='shortlets'>
      <div>
        <h3 className='h3b text-center'>Find Short lets <span className='purple-tx'> For Rent</span></h3>
        <p className='text-center'>The perfect apartments and villas presented to you</p>
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

export default ShortletsSect;
