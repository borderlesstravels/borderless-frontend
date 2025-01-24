import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  PropertyRecentSearch1,
  PropertyRecentSearch2,
  PropertyRecentSearch3,
  PropertyRecentSearch4,
 } from '../../../../assets/images';
import { resourceLinks } from '../../../../config/environment';
import { routeConstants } from '../../../../services/constants/route-constants';
import { formatNumber, stringifyFilter } from '../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../services/utils/request';
import { iFullShortletInfo } from '../../../host/add-stay/add-shortlet/add-shortlet-data';
import { iStrictAddress, IStrictStaySearchData, storedCombinedStayData as sData } from '../../../../services/utils/stay-booking-service';
import SubscribeSect from '../../home/page-modules/subscribe/subscribe';
import BannerSect from './hero/banner';
import OffersSect from './offers/offers';
import PropertiesSect from './properties/properties';
import StayLocationDealsSect from './stay-location-deals/stay-location-deals';
import StaySearchFilter from './stay-search-filter/stay-search-filter';
import { calculatePrice, calculatePriceRaw, countAppartmentFeatures, formatTime, generateRatingStars } from './stay-search-service';
import './stay-search.scss';

function StaysPage(props: any) {

  const navigate = useNavigate();
  const init = true;

  const [loading, setLoading] = useState(false);
  const [staysSearched, setStaysSearched] = useState(false);
  const [searchParam, setSearchParam] = useState<any>();
  const [stayList, setStayList] = useState<iFullShortletInfo[]>([]);
  const [filteredStayList, setFilteredStayList] = useState<iFullShortletInfo[]>([]);

  const searchStays = (stayData = sData) => {
    setLoading(true);
    setStaysSearched(true);
    setStayList([]);
    const param = {
      startDate: stayData?.date?.startDate?.toISOString()?.split('T')[0] || '',
      endDate: stayData?.date?.endDate?.toISOString()?.split('T')[0] || '',
      lga: stayData?.location?.address?.lga?.replace(/ /g, '-') || '',
      state: stayData?.location?.address?.state?.replace(/ /g, '-') || '',
      country: stayData?.location?.address?.country?.replace(/ /g, '-') || '',
    }
    setSearchParam(param);
    
    sendRequest(
      {
        url: "shortlet/fetch-shortlets" + stringifyFilter(param),
        method: "GET",
      },
      (res: any) => {
        if(Array.isArray(res.data)) {
          const newList = res.data.map((item: any) => {
            const newItem = {...item}
            newItem.images = item.images.split(',').map((img: string) => resourceLinks.shortletImages + img);
            newItem.rating = 3;
            newItem.price = calculatePriceRaw(newItem);
            return newItem
          })
          console.log({newList});
          setStayList(newList);
          setFilteredStayList(newList);
        } else {
          setStayList([]);
        }
        setLoading(false);
      },
      (err: any) => {
        setLoading(false);
        setStayList([]);
        setFilteredStayList([]);
      }
    );
  };

  const updateFilter = (updatedList: any[]) => {
    setFilteredStayList(updatedList);
  }

  const viewStayDetails = (id: string | undefined) => {
    if(id) {
      const param = {
        startDate: searchParam?.startDate,
        endDate: searchParam?.endDate,
      }
      navigate(`/${routeConstants.stayPreview}/${id}${stringifyFilter(param)}`)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sData.location?.address && sData.date?.endDate) {
      searchStays(sData);
    }
  }, [props]);
  
  return (
    <div className='stay-search'>
      <BannerSect searchStays={searchStays} />
      <div className='stay-case'>
        {
          staysSearched ?
          <div className='stay-listout'>
            <StaySearchFilter list={stayList} updateList={updateFilter}>
                {
                    !loading &&
                    <p className='reduced-x'>
                      <span className='blue-tx number-bold'>Showing {filteredStayList.length} of</span> 
                      <span className='orange-tx number-bold'> {filteredStayList.length} stays</span>
                    </p>
                  }
                  <div className='stay-list-restrictor'>
                    {
                      filteredStayList.map((stay, index) => (
                        <div className='stay-card' key={index}>
                          <div className='logo-side'>
                            <img src={stay.images[0]} alt="" />
                          </div>
                          <div className='content-side spread-info-vertical'>
                            <div className='w100-flat'>
                              <div className='spread-info mb-2'>
                                <h5 className='number-bold'>{stay.apartment_name}</h5>
                                <div className=''>
                                  <p className='mb-0 reduced-x faint-tx'>Starting from</p>
                                  <h5 className='orange-tx number-bold'>{calculatePrice(stay)}<span className='reduced-xl-im'>/day</span></h5>
                                </div>
                              </div>
                              <div className='mb-2 reduced-soft'>
                                <p className='mb-1'>
                                  <FontAwesomeIcon icon={'map-marker'} /> &nbsp;
                                  <span className='faint-tx'>{stay.address}</span>
                                </p>
                                <div className='spread-info-front'>
                                  <p className='mb-0'>
                                    {generateRatingStars(stay.rating || 0)} &nbsp;
                                    {stay.rating} Star Appartment
                                  </p>
                                  <p className='mb-0'>
                                    <FontAwesomeIcon icon={'brush'} className='ms-3' /> &nbsp;
                                    {countAppartmentFeatures(stay)}
                                  </p>
                                </div>
                              </div>
                              <div className='spread-info mb-2'>
                                <div className='spread-info'>
                                  <div className='center-info save-stay'>
                                    <p className='mb-1'>4.3</p>
                                  </div>
                                  <h6 className='mb-0 mx-3'><span className='font-weight-bold'>Very Good</span> &nbsp; <span className='number-medium'> 231</span> Reviews</h6>
                                </div>
                              </div>
                            </div>
                            <div className='description-grid-50 w100-flat'>
                              <div className='center-info save-stay'>
                                <FontAwesomeIcon icon={'heart'} className='save-icon' />
                              </div>
                              <div className='pl-3'>
                                <button className='stay-button' onClick={() => viewStayDetails(stay._id)}>View Shortlet</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {
                    filteredStayList.length === 0 && !loading &&
                    <div className='stay-card2 center-info'>
                      <h5 className=''>No Stay matches your search</h5>
                    </div>
                  }
            </StaySearchFilter>
          </div>
          :
          <div className='stay-info'>
            <div className='w90 max1100'>
              <h3 className='h3b pb-4'>Your recent <span className='orange-tx'> searches</span></h3>
              <div className='row'>
                <div className='col-lg-3 col-sm-6 py-2'>
                  <div className='description-grid-80' data-aos="zoom-out">
                    <div className='imh'>
                      <img src={PropertyRecentSearch1} className='rad-10 shadowed' alt="" />
                    </div>
                    <div className='px-2 pt-3'>
                      <h6 className='increased mb-0'>Istanbul, Turkey</h6>
                      <p className='mb-0 faint-tx number-light'>325 places</p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 py-2'>
                  <div className='description-grid-80' data-aos="zoom-out" data-aos-delay='200'>
                    <div className='imh'>
                      <img src={PropertyRecentSearch2} className='rad-10 shadowed' alt="" />
                    </div>
                    <div className='px-2 pt-3'>
                      <h6 className='increased mb-0'>Sydney, Australia</h6>
                      <p className='mb-0 faint-tx number-light'>325 places</p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 py-2'>
                  <div className='description-grid-80' data-aos="zoom-out" data-aos-delay='400'>
                    <div className='imh'>
                      <img src={PropertyRecentSearch3} className='rad-10 shadowed' alt="" />
                    </div>
                    <div className='px-2 pt-3'>
                      <h6 className='increased mb-0'>Baku, Azerbaijan</h6>
                      <p className='mb-0 faint-tx number-light'>325 places</p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-3 col-sm-6 py-2'>
                  <div className='description-grid-80' data-aos="zoom-out" data-aos-delay='600'>
                    <div className='imh'>
                      <img src={PropertyRecentSearch4} className='rad-10 shadowed' alt="" />
                    </div>
                    <div className='px-2 pt-3'>
                      <h6 className='increased mb-0'>Malé, Maldives</h6>
                      <p className='mb-0 faint-tx number-light'>325 places</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StayLocationDealsSect>
              <div className='w90 max1100 pt-5'>
                <h3 className='h3b'>Favorite Hotels <span className='orange-tx'> Round the Globe</span></h3>
                <p className='increased'>
                  Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the 
                  travel tools to get you to your destination.
                </p>
              </div>
            </StayLocationDealsSect>
            <OffersSect/>
            <PropertiesSect/>
          </div>
        }
      </div>
      <SubscribeSect/>
    </div>
  );
}

export default StaysPage;
