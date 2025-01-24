import React, { useEffect, useState } from 'react';
import BannerSect from './hero/banner';
import SubscribeSect from '../../home/page-modules/subscribe/subscribe';
import './flight-search.scss';
import Loader from '../../../../components/block-components/loader/loader';
import { storedCombinedFlightData as fData } from '../../../../services/utils/flight-booking-service';
import TravelDealsSect from '../../home/page-modules/travel-deals/travel-deals';
import { sendRequest } from '../../../../services/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { routeConstants } from '../../../../services/constants/route-constants';
import { formatDateToUTC, formatNumber } from '../../../../services/utils/data-manipulation-utilits';
import { formatTime, getFlightToAndFrom } from './flight-search-service';
import FlightSearchFilter from './flight-search-filter/flight-search-filter';

function FlightSearchPage(props: any) {

  const navigate = useNavigate();
  const init = true;

  const [loading, setLoading] = useState(false);
  const [flightsSearched, setFlightsSearched] = useState(false);
  const [flightList, setFlightList] = useState<any[]>([]);
  const [filteredFlightList, setFilteredFlightList] = useState<any[]>([]);

  const fetchFlights = (flightData = fData) => {
    setLoading(true);
    setFlightsSearched(true);
    setFlightList([]);
    
    sendRequest(
      {
        url: "flight/flight-offer-search",
        method: "POST",
        body: {
          origin: fData.location?.from?.iata_code,
          destination: fData.location?.to?.iata_code,
          departure_date: formatDateToUTC(fData.date?.startDate),
          adults: fData.flightClass ? fData.flightClass.adultCount : 0,
          cabin: fData.flightClass?.cabinClass.toLocaleLowerCase(),
          children: `${fData.flightClass?.childrenCount || 0}`,
          infants: fData.flightClass ? fData.flightClass.infantCount : 0,
          return_date: fData.date?.endDate ? formatDateToUTC(fData.date?.endDate) : ""
        },
      },
      (res: any) => {
        if(Array.isArray(res.data)) {
          setFlightList(res.data);
          setFilteredFlightList(res.data);
        } else {
          setFlightList([]);
        }
        setLoading(false);
      },
      (err: any) => {
        setLoading(false);
        setFlightList([]);
        setFilteredFlightList([]);
      }
    );
  };

  const updateFilter = (updatedList: any[]) => {
    setFilteredFlightList(updatedList);
  }

  const viewFlightDetails = (id: number) => {
    if(id) {
      navigate(`/${routeConstants.flightPreview}/${id}`)
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [init]);
  useEffect(() => {
    if (fData.location && fData.date && fData.flightClass) {
      fetchFlights(fData);
    }
  }, [props]);
  
  return (
    <div className='flight-search'>
      <BannerSect searchFlights={fetchFlights} />
      <div className='flight-case'>
        {
          flightsSearched ?
          <div className='flight-listout'>
            <FlightSearchFilter list={flightList} updateList={updateFilter}>
                {
                    !loading &&
                    <p className='reduced-x'>
                      <span className='blue-tx number-bold'>Showing {filteredFlightList.length} of</span> 
                      <span className='orange-tx number-bold'> {filteredFlightList.length} flights</span>
                    </p>
                  }
                  <div className='flight-list-restrictor'>
                    {
                      filteredFlightList.map((flight, index) => (
                        <div className='flight-card' key={index}>
                          <div className='logo-side'>
                            <img src={flight.outbound[0]?.airline_details?.logo} alt="" />
                            <p className='text-center pt-2 mb-1'>{flight.outbound[0]?.airline_details?.name}</p>
                          </div>
                          <div className='content-side'>
                            <div className='spread-info mb-2'>
                              <div className='spread-info'>
                                <div className='center-info save-flight'>
                                  <p className='mb-1'>4.3</p>
                                </div>
                                <h6 className='mb-0 mx-3'>{getFlightToAndFrom(flight).from} - {getFlightToAndFrom(flight).to}</h6>
                              </div>
                              <h5 className='orange-tx number-bold'><span className='reduced-im'>{flight.currency}</span> {formatNumber(Math.ceil(flight?.amount))}</h5>
                            </div>
                            {
                              flight.outbound.map((trip: any, tripIndex: number) => (
                                <div className='pb-2 w96 max500' key={tripIndex}>
                                  <div className='spread-info pb-i'>
                                    <p className='f500 mb-0 number-bold'>{formatTime(trip.departure_time)}</p>
                                    <span className='reduced-im number-light'>{Math.floor(trip.duration/60)}Hs, {trip.duration % 60}Ms</span>
                                    <p className='f500 mb-0 number-bold'>{formatTime(trip.arrival_time)}</p>
                                  </div>
                                  <div className='spread-info'>
                                    <p className='fainter-tx reduced-soft'>{trip.airport_from_details?.iata_code}</p>
                                    <span className='reduced-im faint-tx'>non-stop</span>
                                    <p className='fainter-tx reduced-soft'>{trip.airport_to_details?.iata_code}</p>
                                  </div>
                                </div>
                              ))
                            }
                            {
                              flight.inbound.length > 0 &&
                              <hr className='text-center'/>
                            }
                            {
                              flight.inbound.map((trip: any, tripIndex: number) => (
                                <div className='pb-2 w96 max500' key={tripIndex}>
                                  <div className='spread-info pb-i'>
                                    <p className='f500 mb-0 number-bold'>{formatTime(trip.departure_time)}</p>
                                    <span className='reduced-im number-light'>{Math.floor(trip.duration/60)}Hs, {trip.duration % 60}Ms</span>
                                    <p className='f500 mb-0 number-bold'>{formatTime(trip.arrival_time)}</p>
                                  </div>
                                  <div className='spread-info'>
                                    <p className='fainter-tx reduced-soft'>{trip.airport_from_details?.iata_code}</p>
                                    <span className='reduced-im faint-tx'>non-stop</span>
                                    <p className='fainter-tx reduced-soft'>{trip.airport_to_details?.iata_code}</p>
                                  </div>
                                </div>
                              ))
                            }
                            <div className='description-grid-50'>
                              <div className='center-info save-flight'>
                                <FontAwesomeIcon icon={'heart'} className='save-icon' />
                              </div>
                              <div className='pl-3'>
                                <button className='flight-button' onClick={() => viewFlightDetails(flight.id)}>View Flight</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {
                    filteredFlightList.length === 0 && !loading &&
                    <div className='flight-card2 center-info'>
                      <h5 className=''>No Flight matches your search</h5>
                    </div>
                  }
            </FlightSearchFilter>
          </div>
          :
          <TravelDealsSect/>
        }
      </div>
      <SubscribeSect/>
      {loading && <div className='loader-holder'><Loader/></div>}
    </div>
  );
}

export default FlightSearchPage;
