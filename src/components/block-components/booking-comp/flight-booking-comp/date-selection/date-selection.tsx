import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clipToLength, formatDate, formatDateMin, generateDateRestriction } from '../../../../../services/utils/data-manipulation-utilits';
import { sendRequest } from '../../../../../services/utils/request';
import TypeSuggestComponent from '../../../../base-components/type-suggest/type-suggest';
import AppPopup from '../../../app-popup/app-popup';
import { DateRangePicker, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './date-selection.scss';
import { IDateData, storedCombinedFlightData } from '../../../../../services/utils/flight-booking-service';

interface iDateProps {
  setDate: Function;
  multiple?: boolean;
  date?: IDateData
}

function DateSelectionComp(props: iDateProps) {

  const [showStartPopup, setShowStartPopup] = useState<0 | 1 | 2>(0);
  const [showEndPopup, setShowEndPopup] = useState<0 | 1 | 2>(0);
  const [initialized, setInitialized] = useState(false)
  const [selectionRange, setSelectionRange] = useState<IDateData>(props.date?.startDate ? props.date : { startDate: new Date(), endDate: new Date(), key: 'selection' });
  const [confirmedSelectionRange, setConfirmedSelectionRange] = useState<IDateData>(props.date || { startDate: undefined, endDate: undefined, key: 'selection' });
  const [selectionDate, setSelectionDate] = useState(props.date?.startDate || undefined);
  const [startDate, setStartDate] = useState(props.date?.startDate || undefined);
  const [endDate, setEndDate] = useState(props.date?.endDate || undefined);
  const [activeDate, setActiveDate] = useState(false);

  const toggleShowStartPopup = (status?: 0 | 1 | 2) => {
    setShowStartPopup(status || 0);
  }
  const toggleShowEndPopup = (status?: 0 | 1 | 2) => {
    setShowEndPopup(status || 0);
  }
  // const monthDisplayCount = window.innerWidth > 991 ? 2 : 1;
  // const handleSelect = (date: any) => {
  //   setSelectionDate(date);
  //   setActiveDate(date ? true : false);
  // }
  const handleStartSelect = (date: any) => {
    setStartDate(date);
    if(endDate && endDate <= date){
      setEndDate(undefined);
    }
    toggleShowStartPopup(1);
  }
  const handleEndSelect = (date: any) => {
    setEndDate(date);
    toggleShowEndPopup(1);
  }
  // const resetDates = () => {
  //   setSelectionRange({ startDate: new Date(), endDate: new Date(), key: 'selection' });
  //   setConfirmedSelectionRange({ startDate: undefined, endDate: undefined, key: 'selection' });
  //   setSelectionDate(undefined);
  //   setActiveDate(false);
  // }
  const resetStartDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  }
  const resetEndDates = () => {
    setEndDate(undefined);
  }

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
    }, 1000);
  })
  useEffect(() => {
    if(initialized){
      resetStartDates();
      resetEndDates();
      props.setDate({startDate: undefined, endDate: undefined});
    }
  }, [props.multiple])

  useEffect(() => {
    if(initialized){
      // if(props.multiple) {
      //   if(startDate && endDate) {
      //     props.setDate({startDate, endDate});
      //   }
      // } else {
      //   props.setDate({startDate});
      // }
      props.setDate({startDate, endDate});
    }
  }, [startDate, endDate])

  return (
    <div className='pt-3 pb-2 row px-2'>
      <div className={props.multiple ? 'col-6 px-1' : 'col-12 px-1'}>
        <AppPopup
          switch={
            <div className='selector' onClick={() => toggleShowStartPopup(2)} title={formatDate(startDate, '...')}>
              <div className='label'><span>Departure</span></div>
              <p className='mb-0 number-medium'>{formatDateMin(startDate, '...')}</p>
              <FontAwesomeIcon icon={'calendar-alt'} className='fainter-tx' />
            </div>
          }
          switchClass='w100-flat'
          showPopup={showStartPopup}
          onClosePopup={() => toggleShowStartPopup()}
        >
          <div className='date-case'>
            <div className='single-date-holder'>
              <Calendar
                  date={startDate}
                  onChange={handleStartSelect}
                  minDate={new Date(generateDateRestriction(0, 0, 1))}
              />
            </div>
            <div className='text-center'>
              <button className='reset-button' onClick={resetStartDates}>Reset Date</button>
            </div>
          </div>
        </AppPopup>
      </div>
      {
        props.multiple ?
        <div className='col-6 px-1'>
          <AppPopup
            switch={
              <div className='selector' onClick={() => toggleShowEndPopup(2)} title={formatDate(endDate, '...')}>
                <div className='label'><span>Return</span></div>
                <p className='mb-0 number-medium'>{formatDateMin(endDate, '...')}</p>
                <FontAwesomeIcon icon={'calendar-alt'} className='fainter-tx' />
              </div>
            }
            switchClass='w100-flat'
            showPopup={showEndPopup}
            onClosePopup={() => toggleShowEndPopup()}
          >
            <div className='date-case'>
              <div className='single-date-holder'>
                <Calendar
                    date={endDate}
                    onChange={handleEndSelect}
                    minDate={startDate || new Date(generateDateRestriction(0, 0, 1))}
                />
              </div>
              <div className='text-center'>
                <button className='reset-button' onClick={resetEndDates}>Reset Date</button>
              </div>
            </div>
          </AppPopup>
        </div> :
        <></>
      }
    </div>
  );
}

export default DateSelectionComp;
