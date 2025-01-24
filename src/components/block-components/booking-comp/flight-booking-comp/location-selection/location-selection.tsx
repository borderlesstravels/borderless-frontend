import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAirport } from '../../../../../services/actions-reducers/airport-list';
import { iStoreState } from '../../../../../services/constants/interfaces/store-schemas';
import { clipToLength } from '../../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../../services/utils/request';
import TypeSuggestComponent from '../../../../base-components/type-suggest/type-suggest';
import AppPopup from '../../../app-popup/app-popup';
import './location-selection.scss';

interface ILocationSelection {
  from: any,
  to: any
}
interface iLocationProps {
  setLocation: Function;
  componentState?: any;
  location?: ILocationSelection;
}

function LocationSelectionComp(props: iLocationProps) {

  const [showPopup, setShowPopup] = useState<0 | 1 | 2>(0);
  const [showEndPopup, setShowEndPopup] = useState<0 | 1 | 2>(0);
  // const [airportList, setAirportList] = useState<any[]>([]);
  const [location, setLocation] = useState<ILocationSelection>(props.location || {from: undefined, to: undefined});
  const [confirmedLocation, setConfirmedLocation] = useState<ILocationSelection>(props.location || {from: undefined, to: undefined});

  const airportList = useSelector((state: iStoreState) => state.airportList);

  const toggleShowPopup = (status?: 0 | 1 | 2) => {
    setShowPopup(status || 0);
  }

  const dispatch = useDispatch();

  const updateSelection = (data: any, type: 'from' | 'to') => {
    const currentLocation = {...location};
    if(type === 'from') {
      currentLocation.from = data;
    } else {
      currentLocation.to = data;
    }
    setLocation(currentLocation);
  }

  const confirmLocation = () => {
    setConfirmedLocation(location);
    toggleShowPopup(1);
  }

  useEffect(() => {
    if(!airportList || airportList.length === 0) {
      dispatch(getAirport());
    }
  }, [props.componentState])

  useEffect(() => {
    if(location.from && location.to){
      props.setLocation(location);
    } else {
      props.setLocation({from: undefined, to: undefined});
    }
  }, [location])

  return (
    <div className='location-holder'>
      <div className='row px-2'>
        <div className='pt-3 col-sm-6 px-1'>
          <div className={'location-selection' + (location.to ? ' selected-label' : '')}>
            <div className='label'>Take off</div>
            <TypeSuggestComponent
              data={airportList}
              typePlaceholder='Enter Take off'
              floatOption initialValue={location.from?.name}
              selected={(data: any) => updateSelection(data, 'from')}
              subKey='name'
              subKey2='city'
              listLength={20}
            />
          </div>
        </div>
        <div className='pt-3 pb-2 col-sm-6 px-1'>
          <div className={'location-selection' + (location.to ? ' selected-label' : '')}>
            <div className='label'>Destination</div>
            <TypeSuggestComponent
              data={airportList}
              typePlaceholder='Enter Destination'
              floatOption initialValue={location.to?.name}
              selected={(data: any) => updateSelection(data, 'to')}
              subKey='name'
              subKey2='city'
              listLength={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationSelectionComp;
