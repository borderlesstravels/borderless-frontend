import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { IFlightClassData } from '../../../../../services/utils/flight-booking-service';
import IncrementalCountComponent from '../../../../base-components/incremental-count/incremental-count';
import AppPopup from '../../../app-popup/app-popup';
import './flight-class-selection.scss';

interface iFlightClassProps {
  setFlightClass: Function;
  flightClass?: IFlightClassData;
}

function FlightClassSelectionComp(props: iFlightClassProps) {

  const [showPopup, setShowPopup] = useState<0 | 1 | 2>(0);
  const [adultCount, setAdultCount] = useState(props.flightClass?.adultCount || 1);
  const [childrenCount, setChildrenCount] = useState(props.flightClass?.childrenCount || 0);
  const [infantCount, setInfantCount] = useState(props.flightClass?.infantCount || 0);
  const [allPassengerCount, setAllPassengerCount] = useState(props.flightClass?.allPassengerCount || 0);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium' | 'Business' | 'First'>(props.flightClass?.cabinClass || 'Economy');

  const toggleShowPopup = (status?: 0 | 1 | 2) => {
    setShowPopup(status || 0);
  }

  const updateAdultCount = (count: number) => {
    setAdultCount(count);
  }
  const updateChildrenCount = (count: number) => {
    setChildrenCount(count);
  }
  const updateInfantCount = (count: number) => {
    setInfantCount(count);
  }

  const updateCabinClass = (cabinClass: 'Economy' | 'Premium' | 'Business' | 'First') => {
    setCabinClass(cabinClass);
  }

  const calculateAllPassengerCount = () => {
    const all = 
      adultCount +
      childrenCount +
      infantCount
    setAllPassengerCount(all);
  }

  const sendFlightUpdates = () => {
    props.setFlightClass({
      adultCount,
      childrenCount,
      infantCount,
      cabinClass,
      allPassengerCount,
    });
  }
  
  const confirmPassengerCounts = () => {
    toggleShowPopup(1);
  }

  useEffect(() => {
    calculateAllPassengerCount();
  }, [
    adultCount,
    childrenCount,
    infantCount,
  ])
  useEffect(() => {
    sendFlightUpdates();
  }, [allPassengerCount, cabinClass])

  return (
    <div className='pt-3 pb-2'>
      <AppPopup
        switch={
          <div className='selector' onClick={() => toggleShowPopup(2)} 
            title={
              `${adultCount} Adult${adultCount === 1 ? '' : 's'}, ` +
              `${(childrenCount + infantCount)} Minor${(childrenCount + infantCount) === 1 ? '' : 's'}, ${cabinClass}`
            }
          >
            <div className='label'>Passenger - Class</div>
            <p className='mb-0 reduced-info'>{allPassengerCount} Passenger{allPassengerCount === 1 ? '' : 's'}</p>
            <FontAwesomeIcon icon={'chevron-down'} className='fainter-tx' />
          </div>
        }
        switchClass='w100-flat'
        showPopup={showPopup}
        onClosePopup={() => toggleShowPopup()}
      >
        <div className='flight-class-case'>
          <div className='sect-holder'>
            <div className='label'>Passenger</div>
            <div className='passenger-sect'>
              <span className='faint-tx'>Adults</span>
              <IncrementalCountComponent updateCount={updateAdultCount} minimum={1} count={adultCount} />
            </div>
            <div className='passenger-sect'>
              <span className='faint-tx'>Children 2 - 17</span>
              <IncrementalCountComponent updateCount={updateChildrenCount} count={childrenCount} />
            </div>
            <div className='passenger-sect'>
              <span className='faint-tx'>Infants</span>
              <IncrementalCountComponent updateCount={updateInfantCount} count={infantCount} />
            </div>
          </div>
          <div className='separator'></div>
          <div className='sect-holder pb-3'>
            <div className='label'>Cabin Class</div>
            <div 
              className={'flight-class-sect' + (cabinClass === 'Economy' ? ' selected' : '')}
              onClick={() => updateCabinClass('Economy')}
            >
              <input
                type="radio"
                value={'Economy'}
                name='flight-class'
                checked={cabinClass === 'Economy'}
                onChange={() => updateCabinClass('Economy')}
              />
              <span className=''>Economy</span>
            </div>
            <div 
              className={'flight-class-sect' + (cabinClass === 'Premium' ? ' selected' : '')}
              onClick={() => updateCabinClass('Premium')}
            >
              <input
                type="radio"
                value={'Premium'}
                name='flight-class'
                checked={cabinClass === 'Premium'}
                onChange={() => updateCabinClass('Premium')}
              />
              <span className=''>Premium Economy</span>
            </div>
            <div 
              className={'flight-class-sect' + (cabinClass === 'Business' ? ' selected' : '')}
              onClick={() => updateCabinClass('Business')}
            >
              <input
                type="radio"
                value={'Business'}
                name='flight-class'
                checked={cabinClass === 'Business'}
                onChange={() => updateCabinClass('Business')}
              />
              <span className=''>Business</span>
            </div>
            <div 
              className={'flight-class-sect mb-2' + (cabinClass === 'First' ? ' selected' : '')}
              onClick={() => updateCabinClass('First')}
            >
              <input
                type="radio"
                value={'First'}
                name='flight-class'
                checked={cabinClass === 'First'}
                onChange={() => updateCabinClass('First')}
              />
              <span className=''>First Class</span>
            </div>
            {
              adultCount >= infantCount ?
              <button className='flight-button py-1 px-3' onClick={confirmPassengerCounts}>OK</button> :
              <p className='reduced red-tx italic'>You need an adult present for every infant, infants can not exceed adults</p>
            }
          </div>
        </div>
      </AppPopup>
    </div>
  );
}

export default FlightClassSelectionComp;
