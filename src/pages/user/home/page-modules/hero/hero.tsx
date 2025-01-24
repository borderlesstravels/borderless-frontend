import React from 'react';
import { useNavigate } from 'react-router';
import { DownloadAppstoreHero, DownloadPlaystoreHero, HomeHeroImage, HomePlanePath } from '../../../../../assets/images';
import BookingComp from '../../../../../components/block-components/booking-comp/booking-comp';
import { routeConstants } from '../../../../../services/constants/route-constants';
import './hero.scss';

function HeroSect() {

  const navigate = useNavigate();

  const goToFlights = () => {
    navigate(`/${routeConstants.flights}`)
  }
  
  return (
    <div className='hero'>
      <div className='holder-1100 hero-spread'>
        <div className='plane-path' data-aos='fade-in' data-aos-delay='1600'>
          <img src={HomePlanePath} alt="" />
        </div>
        <div className='text-sect' data-aos='fade-right'>
          <h1>Borderless</h1>
          <h2>
            <span className='orange-tx'>Seamless</span> booking, <br/>
            <span className='yellow-tx'>boundless</span> adventures
          </h2>
          <p>
            Plan and book your perfect trip with expert advice, travel 
            tips, destination information and inspiration from us!
          </p>
          <div className='info-grid button-sect'>
            <div className='imh'>
              <img src={DownloadPlaystoreHero} alt="" />
            </div>
            <div className='imh'>
              <img src={DownloadAppstoreHero} alt="" />
            </div>
          </div>
        </div>
        <div className='img-sect' data-aos='zoom-out' data-aos-delay='800'>
          <img src={HomeHeroImage} alt="" />
        </div>
      </div>
      <div>
      </div>
      <div className='booking-sect'>
        <BookingComp searchFlights={goToFlights} />
      </div>
    </div>
  );
}

export default HeroSect;
