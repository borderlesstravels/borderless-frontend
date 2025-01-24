
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iFullShortletInfo } from '../../../../host/add-stay/add-shortlet/add-shortlet-data';
import './amenities.scss';

function AmenitiesPage({stayDetails}: {stayDetails: iFullShortletInfo | undefined}) {
  
  return (
    <>
    <div className='py-5 bordered-top-bottom'>
      <h3 className='font-weight-bold'>What this place offers</h3>
      <div className='row'>
        {
          stayDetails?.bathtube &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'bath'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Bathtub</p>
          </div>
        }
        {
          stayDetails?.bidet &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'shower'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Bidet</p>
          </div>
        }
        {
          stayDetails?.body_soap &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'soap'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Body Soap</p>
          </div>
        }
        {
          stayDetails?.cleaning_products &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'pump-soap'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Cleaning Products</p>
          </div>
        }
        {
          stayDetails?.hot_water &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'shower'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Hot Water</p>
          </div>
        }
        {
          stayDetails?.bed_linens &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'bed-pulse'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Bed Linens</p>
          </div>
        }
        {
          stayDetails?.clothing_storage &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'warehouse'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Clothing Storage</p>
          </div>
        }
        {
          stayDetails?.drying_rack &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'sign-hanging'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Drying Rack</p>
          </div>
        }
        {
          stayDetails?.essentials &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'toilet-paper'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Essentials (Towels, sheets, soap, toilet paper)</p>
          </div>
        }
        {
          stayDetails?.extra_pillows &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'mattress-pillow'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Extra pillows &amp; blankets</p>
          </div>
        }
        {
          stayDetails?.free_dryer &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'vest'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Free dryer in building</p>
          </div>
        }
        {
          stayDetails?.free_washer &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'sink'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Free washer in unit</p>
          </div>
        }
        {
          stayDetails?.hangers &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'sign-hanging'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Hangers</p>
          </div>
        }
        {
          stayDetails?.iron &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'shirt'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Pressing Iron</p>
          </div>
        }
        {
          stayDetails?.darkening_shades &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'person-booth'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Room - darkening shades</p>
          </div>
        }
        {
          stayDetails?.archade_games &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'vr-cardboard'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Archade Games</p>
          </div>
        }
        {
          stayDetails?.bluetooth &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'check-double'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Bluetooth</p>
          </div>
        }
        {
          stayDetails?.reading &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'book-open-reader'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Reading</p>
          </div>
        }
        {
          stayDetails?.game_console &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'gamepad'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Game Console</p>
          </div>
        }
        {
          stayDetails?.ping_pong_table &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'table-tennis-paddle-ball'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Ping Pong Table</p>
          </div>
        }
        {
          stayDetails?.pool_table &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'circle-dot'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Pool Table</p>
          </div>
        }
        {
          stayDetails?.tv &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'tv'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>TV</p>
          </div>
        }
        {
          stayDetails?.ac &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'temperature-low'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Air Conditioning</p>
          </div>
        }
        {
          stayDetails?.fans &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'fan'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Fans</p>
          </div>
        }
        {
          stayDetails?.monoxide_alarm &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'bell'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Monoxide Alarm</p>
          </div>
        }
        {
          stayDetails?.fire_extinguisher &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'fire-extinguisher'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Fire Extinguisher</p>
          </div>
        }
        {
          stayDetails?.first_aid_kit &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'suitcase-medical'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>First aid Kit</p>
          </div>
        }
        {
          stayDetails?.security_cameras &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'video'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Security Cameras</p>
          </div>
        }
        {
          stayDetails?.smoke_alarm &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'bell'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Smoke Alarm</p>
          </div>
        }
        {
          stayDetails?.dedicated_workspace &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'building'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Dedicated Workspace</p>
          </div>
        }
        {
          stayDetails?.wifi &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'wifi'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Wifi</p>
          </div>
        }
        {
          stayDetails?.bbq_grill &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'fire-burner'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>BBG Grill</p>
          </div>
        }
        {
          stayDetails?.outdoor_dining &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'utensils'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Outdoor Dining</p>
          </div>
        }
        {
          stayDetails?.outdoor_furniture &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'couch'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Outdoor Furniture</p>
          </div>
        }
        {
          stayDetails?.patio_balcony &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'building-flag'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Patio or Balcony</p>
          </div>
        }
        {
          stayDetails?.backyard_fenced &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'mountain-city'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Backyard Fully Fenced</p>
          </div>
        }
        {
          stayDetails?.carpot &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'car'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Free carport on premises</p>
          </div>
        }
        {
          stayDetails?.street_parking &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'car-side'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Free street parking</p>
          </div>
        }
        {
          stayDetails?.private_pool &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'person-swimming'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Private Pool</p>
          </div>
        }
        {
          stayDetails?.lockbox &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'lock'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Lockbox</p>
          </div>
        }
        {
          stayDetails?.self_checkin &&
          <div className='col-md-6 spread-info-front py-2'>
            <FontAwesomeIcon icon={'user-check'} />
            <p className='ps-2 reduced-soft number-medium mb-0'>Self check-in</p>
          </div>
        }
      </div>
    </div>
    </>
  );
}

export default AmenitiesPage;
