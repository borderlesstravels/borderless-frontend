import React, { useEffect } from 'react';
import { HomeHappyClientMultiImage, HomeTestimonyDots } from '../../../../../assets/images';
import { Carousel } from '../../../../../components/block-components/carousel';
import { newsList, testimonyList } from './latest-data';
import './latest.scss';

function LatestSect() {

  const testimonyCarousel = testimonyList.map((data, index) => {
    return <div className='testimony-slide-case' key={index}>
        <div className='img-sect'>
          <div className='circle'></div>
          <div className='dotted-image'>
            <img src={HomeTestimonyDots} alt="" />
          </div>
          <div className='user-image'>
            <img src={data.image} alt="" />
          </div>
        </div>
        <div className='text-sect'>
          <h6>{data.name}</h6>
          <p>{data.comment}</p>
        </div>
    </div>
  });

  const previewCount = () => {
    const width = window.innerWidth;
    if(width > 1050) {
      return 3;
    } else if(width > 750) {
      return 2;
    } else {
      return 1;
    }
  }

  const newsCarousel = newsList.map((data, index) => {
    return <div className='news-case' key={index}>
      <div className='news-card' data-aos='zoom-in' data-aos-delay={((index % 5) * 200) + 100}>
        <div className='img-sect'>
          <img src={data.image} alt="" />
        </div>
        <div className='text-sect'>
          <p className='sector-button'>{data.sector}</p>
          <h6>{data.topic}</h6>
          <div className='spread-info mt-2'>
            <div className='spread-info'>
              <div className='icon-holder'>
                <img src={data.icon} alt="" />
              </div>
              <p className='highlighted number-light'>{data.name}</p>
            </div>
            <p>{data.date}</p>
          </div>
        </div>
      </div>
    </div>
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <div className='testimony-sect'>
        <h3 className='h3b text-center'><span className='purple-tx'>What our happy </span> client say</h3>
        <p className='text-center mb-0'>Several selected clients, who already believe in our service.</p>
        <div className='testimony-spread'>
          <div className='carousel-holder'>
            <Carousel
                loop
                autoPlay
                delay={6000}
                freeMode
                slidesPerView={1}
                spaceBetween={0}
                data={testimonyCarousel}
                navigation={false}
                pagination={true}
                customPagination={true}
            />
          </div>
          <div className='multi-image' data-aos="zoom-out" data-aos-delay="200">
            <img src={HomeHappyClientMultiImage} alt="" />
          </div>
        </div>
      </div>
    <div className='latest'>
      <div>
        <h3 className='text-center h3b'>Keep Abreast on the  <span className='orange-tx'> Latest Travel Info</span></h3>
        <div className='holder-1100'>
        <Carousel
            loop
            autoPlay
            delay={6000}
            freeMode
            slidesPerView={previewCount()}
            spaceBetween={0}
            data={newsCarousel}
            navigation={false}
            pagination={false}
            customPagination={true}
        />
        </div>
      </div>
    </div>
    </>
  );
}

export default LatestSect;
