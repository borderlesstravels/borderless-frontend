import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../../services/constants/route-constants';
import { sendRequest } from '../../../../services/utils/request';
import { calculatePrice, countAppartmentFeatures, generateRatingStars, selectAppartmentCategory } from '../../../user/stays/stay-search/stay-search-service';
import './properties-sect.scss';

function PropertiesSect(props: any) {

  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);

  const getProperties = () => {
    sendRequest({
        url: 'host-profile/listings',
        method: 'GET',
    }, (res: any) => {
        setProperties(res.data || []);
    }, (err: any) => {});
  }

  const viewPropertyDetails = (id: string | undefined) => {
    if(id) {
      navigate(`/${routeConstants.viewShortlet}/${id}`)
    }
  }

  const editProperty = (id: string | undefined) => {
    if(id) {
      navigate(`/${routeConstants.editShortlet}/${id}`)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProperties();
  }, [props]);
  
  return (
    <div className='properties-sect'>
      <div className='holder'>
        <h3>Properties</h3>
          {
            properties.length > 0 ?
            properties.map((property, index) => (
              <div key={index} className='property-space'>
                <div className='property-card'>
                  <div className='logo-side'>
                    <img src={property.images[0]} alt="" />
                  </div>
                  <div className='content-side spread-info-vertical'>
                    <div className='w100-flat'>
                      <div className='spread-info mb-2'>
                        <h5 className='number-bold'>{property.apartment_name}</h5>
                        <div className=''>
                          <p className='mb-0 reduced-x faint-tx'>Starting from</p>
                          <h5 className='orange-tx number-bold'>{calculatePrice(property)}<span className='reduced-xl-im'>/day</span></h5>
                        </div>
                      </div>
                      <div className='mb-2 reduced-soft'>
                        <p className='mb-1'>
                          <FontAwesomeIcon icon={'map-marker'} /> &nbsp;
                          <span className='faint-tx'>{property.address}</span>
                        </p>
                        <div className='spread-info-front'>
                          <p className='mb-0 number-light'>
                            {selectAppartmentCategory(property).type} &nbsp;
                            ({selectAppartmentCategory(property).count} Unit{selectAppartmentCategory(property).count !== 1 && 's'})
                          </p>
                          <p className='mb-0'>
                            <FontAwesomeIcon icon={'brush'} className='ms-3' /> &nbsp;
                            {countAppartmentFeatures(property)}
                          </p>
                        </div>
                      </div>
                      <div className='spread-info mb-2'>
                        <div className='spread-info'>
                          <div className='center-info save-property'>
                            <p className='mb-1'>4.3</p>
                          </div>
                          <h6 className='mb-0 mx-3'><span className='font-weight-bold'>Very Good</span> &nbsp; <span className='number-medium'> 231</span> Reviews</h6>
                        </div>
                      </div>
                    </div>
                    <div className='description-grid-50 w100-flat'>
                      <div className='center-info save-property'>
                        <FontAwesomeIcon icon={'heart'} className='save-icon' />
                      </div>
                      <div className='pl-3'>
                        <button className='property-button' onClick={() => viewPropertyDetails(property._id)}>View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='sp'></div>
                <div className='more-detail-card'>
                  <div className='info-part'></div>
                  <div className='action-part'>
                    <button className='property-button' onClick={() => editProperty(property._id)}>Edit Property</button>
                  </div>
                </div>
              </div>
            )) :
            <div className='pt-5 pb-3 text-center'>
              <h3 className='f700 black-tx'>No Properties Yet.</h3>
            </div>
          }
      </div>
    </div>
  );
}

export default PropertiesSect;
