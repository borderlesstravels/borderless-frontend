
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Carousel } from '../../../../../components/block-components/carousel';
import { routeConstants } from '../../../../../services/constants/route-constants';
import './flight-image-slide.scss';

interface IPropData {
  imageList: any[];
  children?: any;
}

function FlightImageSlideSect(props: IPropData) {

  const navigate = useNavigate();
  const [stayLocationDealsData, setStayLocationDealsData] = useState<any[]>(props.imageList);

  const previewCount = () => {
    const width = window.innerWidth;
    if(width > 1200) {
      return 8;
    } else if(width > 900) {
      return 5;
    } else if(width > 760) {
      return 5;
    } else if(width > 600) {
      return 4;
    } else if(width > 450) {
      return 3;
    } else {
      return 2;
    }
  }

  const stayLocationDealsCarousel = stayLocationDealsData.map((image, index) => {
    return <div className='flight-info-case' key={index}>
      <div className='flight-card'>
        <img src={image} alt="" />
      </div>
    </div>
  });

  const viewStayDetails = (id: number) => {
    if(id) {
      navigate(`/${routeConstants.stayPreview}/${id}`)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // getTrendingStays();
  }, [props]);
  
  return (
    <div className=''>
      <div>
        {props.children}
        <div className=''>
        <Carousel
            loop
            autoPlay
            delay={6000}
            freeMode
            slidesPerView={previewCount()}
            spaceBetween={0}
            data={stayLocationDealsCarousel}
            navigation={false}
            pagination={false}
            customPagination={true}
        />
        </div>
      </div>
    </div>
  );
}

export default FlightImageSlideSect;
