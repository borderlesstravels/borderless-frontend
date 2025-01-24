import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Carousel } from '../../../../../components/block-components/carousel';
import { propertiesData } from './properties-data';
import './properties.scss';

function PropertiesSect() {

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

  const shortletCarousel = propertiesData.map((data, index) => {
    return <div className='deal-case' key={index}>
      <div className='deal-card'>
          <div className='imh'>
            <img src={data.image} alt="" />
          </div>
          <div className='title'>
            <h6 className='f700'>{data.title}</h6>
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
    <div className='properties'>
      <div>
        <h3 className='h3b text-center'>Browse by <span className='orange-tx'>property type</span></h3>
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

export default PropertiesSect;
