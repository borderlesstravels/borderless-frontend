import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ILaugageData } from '../../../../../services/utils/flight-booking-service';
import IncrementalCountComponent from '../../../../base-components/incremental-count/incremental-count';
import AppPopup from '../../../app-popup/app-popup';
import './luggage-selection.scss';

interface iLuggageProps {
  setLuggageCounts: Function;
  luggageCounts?: ILaugageData;
}

function LuggageSelectionComp(props: iLuggageProps) {

  const [showPopup, setShowPopup] = useState<0 | 1 | 2>(0);
  const [checkedInCount, setCheckedInCount] = useState(props.luggageCounts?.checkedInCount || 0);
  const [handLuggageCount, setHandLuggageCount] = useState(props.luggageCounts?.handLuggageCount || 0);

  const toggleShowPopup = (status?: 0 | 1 | 2) => {
    setShowPopup(status || 0);
  }

  const updateHandLuggageCount = (count: number) => {
    setHandLuggageCount(count);
  }

  const updateCheckedInCount = (count: number) => {
    setCheckedInCount(count);
  }

  const updateLuggageCounts = () => {
    props.setLuggageCounts({checkedInCount, handLuggageCount});
  }
  
  const confirmLuggageCounts = () => {
    toggleShowPopup(1);
  }

  useEffect(() => {
    updateLuggageCounts();
  }, [checkedInCount, handLuggageCount])

  return (
    <div className='pt-3 pb-2'>
      <AppPopup
        switch={
          <div className='selector' onClick={() => toggleShowPopup(2)} >
            <div className='label'>Luggage</div>
            <p className='mb-0'>{checkedInCount + handLuggageCount} Luggages</p>
            <FontAwesomeIcon icon={'chevron-down'} className='fainter-tx' />
          </div>
        }
        switchClass='w100-flat'
        showPopup={showPopup}
        onClosePopup={() => toggleShowPopup()}
      >
        <div className='luggage-case'>
          <div className='luggage-sect'>
            <div className='icon-case'>
              <FontAwesomeIcon className='case-icon' icon={'bag-shopping'}/>
            </div>
            <span className='faint-tx'>Carry-on bag</span>
            <IncrementalCountComponent updateCount={updateHandLuggageCount} count={handLuggageCount} />
          </div>
          <div className='luggage-sect'>
            <div className='icon-case'>
              <FontAwesomeIcon className='case-icon' icon={'suitcase'}/>
            </div>
            <span className='faint-tx'>Checked in bag</span>
            <IncrementalCountComponent updateCount={updateCheckedInCount} count={checkedInCount} />
          </div>
          <p className='orange-tx reduced-x mb-2 mt-1'>Luggage per passenger</p>
          {
            (checkedInCount + handLuggageCount) > 0 &&
            <button className='flight-button py-1 px-3' onClick={confirmLuggageCounts}>OK</button>
          }
        </div>
      </AppPopup>
    </div>
  );
}

export default LuggageSelectionComp;
