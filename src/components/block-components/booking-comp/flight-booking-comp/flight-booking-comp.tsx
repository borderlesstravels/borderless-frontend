import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from "formik";
import AppPopup from '../../app-popup/app-popup';
import DateSelectionComp from './date-selection/date-selection';
import './flight-booking-comp.scss';
import FlightClassSelectionComp from './flight-class-selection/flight-class-selection';
import LocationSelectionComp from './location-selection/location-selection';
import {
  generateNewCombinedFlightData,
  ICombinedFlightSearchData,
  IDateData,
  IFlightClassData,
  ILocationData,
  storedCombinedFlightData,
  updateCombinedFlightData,
} from '../../../../services/utils/flight-booking-service';
import { toast } from 'react-toastify';

interface IFlightBooking {
  cleanSelection?: boolean;
  hidecategories?: boolean;
  searchFlights?: Function;
}

function FlightBookingComp({cleanSelection, hidecategories, searchFlights}: IFlightBooking) {

  const [combinedFlightData, setCombinedFlightData] = useState<ICombinedFlightSearchData>(
    cleanSelection ? generateNewCombinedFlightData() : storedCombinedFlightData
  );

  const [initialized, setInitialized] = useState(false);
  const [flightType, setFlightType] = useState<'return' | 'one-way'>(combinedFlightData.flightType);
  const [location, setLocation] = useState<ILocationData | undefined>(combinedFlightData.location);
  const [date, setDate] = useState<IDateData | undefined>(combinedFlightData.date);
  const [flightClass, setFlightClass] = useState<IFlightClassData | undefined>(combinedFlightData.flightClass);

  const [canProceed, setCanProceed] = useState(true);
  const [errorListString, setErrorListString] = useState('');
  const [showPromoCode, setShowPromoCode] = useState(false);

  const updateFlightType = (type: 'return' | 'one-way') => {
    setFlightType(type);
  }

  const updateLocation = (locationObj: {from: string, to: string}) => {
    setLocation(locationObj);
  }

  const updateDate = (dateObj: { startDate: Date | undefined, endDate: Date | undefined, key: string| undefined }) => {
    setDate(dateObj);
  }
  const updateFlightClass = (counts: any) => {
    setFlightClass(counts);
  }

  const searchForFlights = (values: FormikValues, controls: any) => {
    if(!canProceed) {
      toast.error('Review inputs: ' + errorListString);
      return;
    }
    if (searchFlights){
      searchFlights(false);
    }
  }

  const validate = (values: FormikValues) => {
    const errors: any = {};
    if(showPromoCode) {
      if(!values.code) {
        errors.code = 'Enter a valid promo code';
      }
    } else {
      // errors.code = 
    }
    return errors;
  }

  const compileCombinedData = () => {
    const tempCombination = {
      location: (location?.from && location?.to) ? location : undefined ,
      date: ((flightType === 'return' && date?.startDate && date?.endDate) || (flightType === 'one-way' && date?.startDate)) ? date : undefined,
      flightClass: flightClass?.allPassengerCount ? flightClass: undefined,
      flightType: flightType,
    }
    const errors: string[] = [];
    setCombinedFlightData(tempCombination);
    if (tempCombination.location && tempCombination.date && ((tempCombination.flightClass?.adultCount || 0) >= (tempCombination.flightClass?.infantCount || 0))) {
      setCanProceed(true);
      updateCombinedFlightData(tempCombination);
    } else {
      if(!tempCombination.location) {
        errors.push('Location Information')
      }
      if(!tempCombination.date) {
        errors.push('Date Information')
      }
      if((tempCombination.flightClass?.adultCount || 0) < (tempCombination.flightClass?.infantCount || 0)) {
        errors.push('Infants can not exceed adults on a trip')
      }
      setCanProceed(false);
      updateCombinedFlightData(generateNewCombinedFlightData());
    }
    setErrorListString(errors.join(', '))
  }

  useEffect(() => {
    setTimeout(() => setInitialized(true), 1000);
  }, [cleanSelection, hidecategories])

  useEffect(() => {
    compileCombinedData();
  }, [location, date, flightClass]);

  return (
    <div className='flight-booking-comp'>
      <div className={'flight-type-selector' + (hidecategories ? '' : ' floated-type')}>
        {/* <div onClick={() => updateFlightType('multi')}>
          <input
            type="radio"
            value={'multi'}
            name='flight-type'
            checked={flightType === 'multi'}
            onChange={() => updateFlightType('multi')}
          />
          <span>Multi city</span>
        </div> */}
        <div onClick={() => updateFlightType('return')}>
          <input
            type="radio"
            value={'return'}
            // defaultChecked
            name='flight-type'
            checked={flightType === 'return'}
            onChange={() => updateFlightType('return')}
          />
          <span>Return</span>
        </div>
        <div onClick={() => updateFlightType('one-way')}>
          <input
            type="radio"
            value={'one-way'}
            name='flight-type'
            checked={flightType === 'one-way'}
            onChange={() => updateFlightType('one-way')}
          />
          <span>One way</span>
        </div>
      </div>
      <div className='row'>
        <div className={flightType === 'return' ? 'col-lg-5 col-sm-12' : 'col-lg-6 col-sm-12'}>
          <LocationSelectionComp location={location} setLocation={updateLocation} />
        </div>
        <div className={flightType === 'return' ? 'col-lg-5 col-sm-8' : 'col-lg-4 col-sm-8'}>
          <DateSelectionComp date={date} setDate={updateDate} multiple={flightType === 'return'} />
        </div>
        {/* <div className='col-lg-3 col-sm-6'>
          <LuggageSelectionComp luggageCounts={luggageCounts} setLuggageCounts={updateLuggageCounts} />
        </div> */}
        <div className='col-lg-2 col-sm-4'>
          <FlightClassSelectionComp flightClass={flightClass} setFlightClass={updateFlightClass} />
        </div>
      </div>
      <Formik
        initialValues={{code: ''}}
        validate={validate}
        onSubmit={(values, controls) => searchForFlights(values, controls)}
      >
        {
          (formProps: FormikProps<{code: string}>) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              setValues,
            } = formProps;
            return (
              <form action="" onSubmit={handleSubmit} className={canProceed ? '' : 'deactivated-view'}>
                <div className='proceed-sect'>
                  {showPromoCode && 
                    <div className={'promo-code-sect ' + (errors.code && touched.code ? "im-error" : "")}>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        value={values.code}
                        onChange={handleChange}
                        placeholder="Enter promo code"
                      />
                      <div className="center-info" onClick={(ev) => {setShowPromoCode(false); setValues({code: ' '})}}>
                        <FontAwesomeIcon className='close-code' icon={'times'} />
                      </div>
                    </div>
                  }
                  {!showPromoCode && 
                    <p className='mb-0 orange-tx f700 reduced-soft clickable px-3' onClick={(ev) => {setShowPromoCode(true); setValues({code: ''})}}>
                      <span><FontAwesomeIcon icon={'plus'} className='reduced-soft' /> </span>
                      Add Promo Code
                    </p>
                  }
                  <button className='flight-button my-2'>
                    <FontAwesomeIcon className='reduced-soft' icon={'paper-plane'} /> Show Flights
                  </button>
                </div>
                {errors.code && touched.code && <p className='booking-error'>{errors.code}</p>}
              </form>
            )
          }
        }
      </Formik>
      
    </div>
  );
}

export default FlightBookingComp;
