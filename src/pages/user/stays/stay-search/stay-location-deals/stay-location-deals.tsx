import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Carousel } from '../../../../../components/block-components/carousel';
import { routeConstants } from '../../../../../services/constants/route-constants';
import { formatNumber } from '../../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../../services/utils/request';
import { stayLocationDealsData as dummyStayLocationDealsData, stayDummyImages } from './stay-location-deals-data';
import './stay-location-deals.scss';

function StayLocationDealsSect(props: any) {

  const navigate = useNavigate();
  const [stayLocationDealsData, setStayLocationDealsData] = useState<any[]>(dummyStayLocationDealsData);

  const previewCount = () => {
    const width = window.innerWidth;
    if(width > 1200) {
      return 4;
    } else if(width > 900) {
      return 3;
    } else if(width > 550) {
      return 2;
    } else {
      return 1;
    }
  }

  const getTrendingStays = () => {
    sendRequest(
      {
        url: "flight/flight-offer-search",
        method: "POST",
        body: {
          origin: "LOS",
          destination: "LAX",
          departure_date: new Date().toISOString().split('T')[0],
          adults: "1",
          cabin: "economy",
          children: "0",
          infants: "0",
          return_date: ""
        },
      },
      (res: any) => {
        const stays = res.data.map((stay: any, index: number) => {
          return {
              location: stay?.outbound[stay?.outbound.length - 1]?.airport_from_details?.city,
              country: stay?.outbound[stay?.outbound.length - 1]?.airport_from_details?.country,
              rating: 4.8,
              oldPrice: 850,
              currentPrice: stay.amount,
              image: stayDummyImages[index % 4],
              // image: stay?.outbound[stay?.outbound.length - 1]?.airline_details?.logo,
              id: stay.id,
          }
        });
        setStayLocationDealsData(stays);
      },
      (err: any) => {}
    );
  };

  const stayLocationDealsCarousel = stayLocationDealsData.map((data, index) => {
    return <div className='location-deal-case' key={index}>
      <div className='deal-card' data-aos='zoom-in' style={{backgroundImage: `url(${data.image})`}} data-aos-delay={((index % 5) * 200) + 100}>
        <div className='img-sect-display'>
          <div className='imh'>
            {/* <img src={data.image} alt="" /> */}
            <img src={stayDummyImages[0]} alt="" />
          </div>
        </div>
        <div className='text-sect'>
          <div className='spread-info mb-2'>
            <div className=''>
              <h6 className=''>{data.name}</h6>
              <p className='number-light'>{data.description}</p>
            </div>
            <h6 className='number-bold'>${formatNumber(data.price)}</h6>
          </div>
          <button onClick={() => viewStayDetails(data.id)}>Book Now</button>
        </div>
      </div>
    </div>
  });

  const viewStayDetails = (id: number) => {
    if(id) {
      navigate(`/${routeConstants.stayPreview}/${id}`)
    }
    console.log({deal_id: id});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // getTrendingStays();
  }, [props]);
  
  return (
    <div className='stay-location-deals'>
      <div className='bg-fade'></div>
      <div>
        {props.children}
        <div className='holder-1100'>
        <Carousel
            loop
            autoPlay
            delay={6000}
            freeMode
            slidesPerView={previewCount()}
            spaceBetween={0}
            data={stayLocationDealsCarousel}
            navigation={true}
            pagination={false}
            customPagination={true}
        />
        </div>
      </div>
    </div>
  );
}

export default StayLocationDealsSect;
