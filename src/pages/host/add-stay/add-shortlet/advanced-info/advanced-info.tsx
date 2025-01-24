
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import IncrementalCountComponent from '../../../../../components/base-components/incremental-count/incremental-count';
import { pickCurrency } from '../../../../../services/utils/currency-handler';
import { acceptOnlyNumbers } from '../../../../../services/utils/data-manipulation-utilits';
import { iAdvancedInfo } from '../add-shortlet-data';
import './advanced-info.scss';
import CounterComponent from './counter-comp/counter-comp';

function AdvancedInfoSect({data, revert, proceed}: {data: iAdvancedInfo, revert: Function, proceed: Function}) {

  const [imageList, setImageList] = useState<any[]>(data.images);
  const [imagePreviewList, setImagePreviewList] = useState<any[]>([]);
  const [facilityInfo, setFacilityInfo] = useState<iAdvancedInfo>({...data, images: []});

  const openUpload = () => {
    document.getElementById('gallery-upload')?.click();
  }

  const selectImages = (e: any) => {
    const files = e.target.files;
    if(files.length > 0) {
      const newImages = [...imageList, ...files];
      setImageList(newImages);
    }
    console.log({files});
  }

  const deleteImages = (index: number) => {
    console.log({index, imageList, imagePreviewList})
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList(newImages);
  }

  const updateFacilityInfo = (count: any, key: string) => {
    const newFacility: any = {...facilityInfo};
    newFacility[key] = count;
    setFacilityInfo(newFacility);
  }

  const updateFacilityTickInfo = (key: string) => {
    const newFacility: any = {...facilityInfo};
    newFacility[key] = newFacility[key] === 1 ? 0 : 1;
    setFacilityInfo(newFacility);
  }

  const previous = () => {
    revert({...facilityInfo, images: imageList});
  }
  const forward = () => {
    if(imageList.length < 5) {
      toast.error('Please upload at least 5 images to proceed')
      document.getElementById('images')?.scrollIntoView();
      return;
    }
    if(!facilityInfo.single && !facilityInfo.suites && !facilityInfo.executive && !facilityInfo.double_chambers) {
      toast.error('please select at least 1 of the room categories');
      document.getElementById('categories')?.scrollIntoView();
      return;
    }
    if(
      (facilityInfo.single && !facilityInfo.single_price) ||
      (facilityInfo.suites && !facilityInfo.suites_price) ||
      (facilityInfo.executive && !facilityInfo.executive_price) ||
      (facilityInfo.double_chambers && !facilityInfo.double_chambers_price)
      ) {
      toast.error('please add the price for this appartment');
      document.getElementById('categories')?.scrollIntoView();
      return;
    }
    if(!facilityInfo.description) {
      toast.error('Please add some description for this facility');
      document.getElementById('description')?.scrollIntoView();
      return;
    } else if(facilityInfo.description && facilityInfo.description.length < 20) {
      toast.error('Description to short, please add more details to proceed');
      document.getElementById('description')?.scrollIntoView();
      return;
    }
    proceed({...facilityInfo, images: imageList});
  }

  const chooseActive = (): 'none' | 'single' | 'suites' | 'executive' | 'double_chambers' => {
    let activeString: 'none' | 'single' | 'suites' | 'executive' | 'double_chambers' = 'none';
    if(!facilityInfo.single && !facilityInfo.suites && !facilityInfo.executive && !facilityInfo.double_chambers) {
      activeString = 'none';
    } else if(facilityInfo.single) {
      activeString = 'single';
    } else if(facilityInfo.suites) {
      activeString = 'suites';
    } else if(facilityInfo.executive) {
      activeString = 'executive';
    } else if(facilityInfo.double_chambers) {
      activeString = 'double_chambers';
    }
    return activeString;
  }

  useEffect(() => {
    const newFacilityInfo = {...facilityInfo};
    if(facilityInfo.single){
      newFacilityInfo.suites_price = newFacilityInfo.executive_price = newFacilityInfo.double_chambers_price = '';
    } else if (facilityInfo.suites){
      newFacilityInfo.single_price = newFacilityInfo.executive_price = newFacilityInfo.double_chambers_price = '';
    } else if (facilityInfo.executive){
      newFacilityInfo.single_price = newFacilityInfo.suites_price = newFacilityInfo.double_chambers_price = '';
    } else if (facilityInfo.double_chambers){
      newFacilityInfo.single_price = newFacilityInfo.suites_price = newFacilityInfo.executive_price = '';
    } 
    setFacilityInfo(newFacilityInfo);
  }, [facilityInfo.single, facilityInfo.suites, facilityInfo.executive, facilityInfo.double_chambers]);

  useEffect(() => {
    const tempImages: any[] = [];
    const tempImageObj: any = {};
    imageList.map((image, index) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        tempImages.push(fileReader.result);
        tempImageObj[index] = fileReader.result;
        if(tempImages.length === imageList.length) {
          // setImagePreviewList(tempImages);
          const alternateList: any[] = [];
          for(let img in tempImageObj) {
            if(tempImageObj[img]){
              alternateList.push(tempImageObj[img]);
            }
          }
          setImagePreviewList(alternateList);
          console.log({tempImages, tempImageObj});
        } else {
          console.log('{facilityInfo}');
        }
      }
      fileReader.readAsDataURL(image);
    })
    if(imageList.length === 0) {
      setImagePreviewList([]);
    }
  }, [imageList]);
  
  return (
    <div className='advanced-info'>
      <div className='gallery'>
        <h4 className='f700'>Gallery</h4>
        <div className='row'>
          <div className='col-md-8'>
            <div className='notice-card'>
              <p className='mb-1'>
                Upload a minimum of 10 images of your hotel here. This should include hotel exteriors and the interiors of each room and facility available.
              </p>
              <p className=''>
                <span className='f500'>Important guidelines:</span> 1200x800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png
              </p>
            </div>
          </div>
          <div className='col-md-4 center-info'>
            <div className='upload-button center-info my-3' onClick={openUpload}>
              <input type="file" multiple id='gallery-upload' onChange={selectImages} />
              <p>Upload Images</p>
              <FontAwesomeIcon icon={'upload'} className='icon' />
            </div>
          </div>
          <div className='col-12 pt-4'>
            <div className='image-container'>
            <div className='scroll-anchor' id='images'></div>
              {
                imagePreviewList.length > 0 ?
                <div className='row'>
                  {imagePreviewList.map((image, index) => (
                    <div className='col-lg-4 col-md-6' key={index}>
                      <div className='image-holder'>
                        <img src={image} alt="" />
                        <div className='remove-image' onClick={() => deleteImages(index)}>
                          <FontAwesomeIcon icon={'times'} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {
                    imagePreviewList.length < 5 && <div>
                      <p className='mb-0 reduced-soft red-tx pt-3 text-center'>Upload {5 - imagePreviewList.length} more image{5 - imagePreviewList.length !== 1 && 's'} to be able to proceed</p>
                    </div>
                  }
                </div> :
                <div className='text-center'>
                  <h5>No Images Uploaded</h5>
                  <p className='mb-0 reduced-soft red-tx'>Upload a minimum of 5 images to be able to proceed</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='full-list'>
        <div className='w90 max1100'>
          <div className='scroll-anchor' id='categories'></div>
          <h4 className='blue-tx f700 pt-4'>Category of Rooms in <span className='purple-tx'>Your Shortlet</span></h4>
          <div className='row pb-3'>
            <div className='col-xl-3 col-md-6 py-3'>
              <div className={(chooseActive() !== 'none' && chooseActive() !== 'single') ? 'deactivated' : ''}>
                <div className='selection-grid-big'>
                  <div className='tick-side'>
                    <IncrementalCountComponent forcedWhite verticalCount updateCount={(count: any) => updateFacilityInfo(count, 'single')} count={facilityInfo.single} />
                  </div>
                  <div className='writeup-side'>
                    <h6 className='ps-3 f700 mb-0'>Single</h6>
                  </div>
                </div>
                <div className='category-price-holder'>
                  <p className='mb-0 amount-text'><span className='purple-tx reduced'>Amount</span></p>
                  <div className='input number-medium'>
                    <div className={'currnency-float reduced' + (facilityInfo.single_price ? '' : ' faint-tx')}> {pickCurrency()} </div>
                    <input 
                      type="text" onKeyUp={acceptOnlyNumbers} value={facilityInfo.single_price} placeholder='0.00'
                      onChange={(ev: any) => updateFacilityInfo(ev.target.value, 'single_price')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-md-6 py-3'>
              <div className={(chooseActive() !== 'none' && chooseActive() !== 'suites') ? 'deactivated' : ''}>
                <div className='selection-grid-big'>
                  <div className='tick-side'>
                    <IncrementalCountComponent forcedWhite verticalCount updateCount={(count: any) => updateFacilityInfo(count, 'suites')} count={facilityInfo.suites} />
                  </div>
                  <div className='writeup-side'>
                    <h6 className='ps-3 f700 mb-0'>Suites</h6>
                  </div>
                </div>
                <div className='category-price-holder'>
                  <p className='mb-0 amount-text'><span className='purple-tx reduced'>Amount</span></p>
                  <div className='input number-medium'>
                    <div className={'currnency-float reduced' + (facilityInfo.suites_price ? '' : ' faint-tx')}> {pickCurrency()} </div>
                    <input 
                      type="text" onKeyUp={acceptOnlyNumbers} value={facilityInfo.suites_price} placeholder='0.00'
                      onChange={(ev: any) => updateFacilityInfo(ev.target.value, 'suites_price')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-md-6 py-3'>
              <div className={(chooseActive() !== 'none' && chooseActive() !== 'executive') ? 'deactivated' : ''}>
                <div className='selection-grid-big'>
                  <div className='tick-side'>
                    <IncrementalCountComponent forcedWhite verticalCount updateCount={(count: any) => updateFacilityInfo(count, 'executive')} count={facilityInfo.executive} />
                  </div>
                  <div className='writeup-side'>
                    <h6 className='ps-3 f700 mb-0'>Executive</h6>
                  </div>
                </div>
                <div className='category-price-holder'>
                  <p className='mb-0 amount-text'><span className='purple-tx reduced'>Amount</span></p>
                  <div className='input number-medium'>
                    <div className={'currnency-float reduced' + (facilityInfo.executive_price ? '' : ' faint-tx')}> {pickCurrency()} </div>
                    <input 
                      type="text" onKeyUp={acceptOnlyNumbers} value={facilityInfo.executive_price} placeholder='0.00'
                      onChange={(ev: any) => updateFacilityInfo(ev.target.value, 'executive_price')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-md-6 py-3'>
              <div className={(chooseActive() !== 'none' && chooseActive() !== 'double_chambers') ? 'deactivated' : ''}>
                <div className='selection-grid-big'>
                  <div className='tick-side'>
                    <IncrementalCountComponent forcedWhite verticalCount updateCount={(count: any) => updateFacilityInfo(count, 'double_chambers')} count={facilityInfo.double_chambers} />
                  </div>
                  <div className='writeup-side'>
                    <h6 className='ps-3 f700 mb-0'>Double Chambers</h6>
                  </div>
                </div>
                <div className='category-price-holder'>
                  <p className='mb-0 amount-text'><span className='purple-tx reduced'>Amount</span></p>
                  <div className='input number-medium'>
                    <div className={'currnency-float reduced' + (facilityInfo.double_chambers_price ? '' : ' faint-tx')}> {pickCurrency()} </div>
                    <input 
                      type="text" onKeyUp={acceptOnlyNumbers} value={facilityInfo.double_chambers_price} placeholder='0.00'
                      onChange={(ev: any) => updateFacilityInfo(ev.target.value, 'double_chambers_price')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <h4 className='blue-tx f700 pt-4 pb-2'>Add a short description  <span className='orange-tx'>of your place.</span></h4>
          <div className='description-area'>
            <div className='scroll-anchor' id='description'></div>
            <textarea 
              value={facilityInfo.description}
              placeholder='Show what makes your property stand out.'
              onChange={(ev: any) => updateFacilityInfo(ev.target.value, 'description')}
            ></textarea>
            {!facilityInfo.description && <div>
              <p className='mb-0 reduced-soft red-tx'>Please include description to be able to proceed</p>
            </div>}
            {facilityInfo.description && facilityInfo.description.length < 20 && <div>
              <p className='mb-0 reduced-soft red-tx'>Description to short, please add more details to proceed</p>
            </div>}
          </div>

          <h4 className='blue-tx f700 pt-4'>Add facilities available  <span className='purple-tx'>at your place.</span></h4>
          <div className='row pb-3'>
            <div className='col-lg-3 col-md-6 py-2'>
              <div className='w90 max250'>
                  <CounterComponent updateCount={(count: any) => updateFacilityInfo(count, 'bedrooms')} minimum={1} count={facilityInfo.bedrooms} className='number-medium reduced-soft-im'>
                    Bedroom{facilityInfo.bedrooms !== 1 && 's'}
                  </CounterComponent>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 py-2'>
              <div className='w90 max250'>
                  <CounterComponent updateCount={(count: any) => updateFacilityInfo(count, 'bathrooms')} minimum={1} count={facilityInfo.bathrooms} className='number-medium reduced-soft-im'>
                    Bathroom{facilityInfo.bathrooms !== 1 && 's'}
                  </CounterComponent>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 py-2'>
              <div className='w90 max250'>
                  <CounterComponent updateCount={(count: any) => updateFacilityInfo(count, 'parking')} count={facilityInfo.parking} className='number-medium reduced-soft-im'>
                    Parking
                  </CounterComponent>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 py-2'>
              <div className='w90 max250'>
                  <CounterComponent updateCount={(count: any) => updateFacilityInfo(count, 'pool')} count={facilityInfo.pool} className='number-medium reduced-soft-im'>
                    Pool{facilityInfo.pool !== 1 && 's'}
                  </CounterComponent>
              </div>
            </div>
          </div>

          <h3 className='f700 pt-4'>Apartment Features by Categories</h3>

          <h4 className='blue-tx f700 pt-4 pb-3'>Bath<span className='purple-tx'>room</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.bathtube ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('bathtube')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.bathtube} /></div>
              <div className='writeup-side-small'><h6>Bathtub</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.bidet ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('bidet')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.bidet} /></div>
              <div className='writeup-side-small'><h6>Bidet</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.body_soap ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('body_soap')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.body_soap} /></div>
              <div className='writeup-side-small'><h6>Body Soap</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.cleaning_products ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('cleaning_products')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.cleaning_products} /></div>
              <div className='writeup-side-small'><h6>Cleaning Products</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.hot_water ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('hot_water')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.hot_water} /></div>
              <div className='writeup-side-small'><h6>Hot Water</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Bedroom and <span className='purple-tx'>Laundry</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.bed_linens ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('bed_linens')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.bed_linens} /></div>
              <div className='writeup-side-small'><h6>Bed Linens</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.clothing_storage ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('clothing_storage')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.clothing_storage} /></div>
              <div className='writeup-side-small'><h6>Clothing Storage</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.drying_rack ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('drying_rack')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.drying_rack} /></div>
              <div className='writeup-side-small'><h6>Drying Rack</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.essentials ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('essentials')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.essentials} /></div>
              <div className='writeup-side-small'><h6>Essentials (Towels, sheets, soap, toilet paper)</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.extra_pillows ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('extra_pillows')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.extra_pillows} /></div>
              <div className='writeup-side-small'><h6>Extra pillows &amp; blankets</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.free_dryer ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('free_dryer')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.free_dryer} /></div>
              <div className='writeup-side-small'><h6>Free dryer in building</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.free_washer ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('free_washer')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.free_washer} /></div>
              <div className='writeup-side-small'><h6>Free washer in unit</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.hangers ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('hangers')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.hangers} /></div>
              <div className='writeup-side-small'><h6>Hangers</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.iron ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('iron')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.iron} /></div>
              <div className='writeup-side-small'><h6>Pressing Iron</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.darkening_shades ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('darkening_shades')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.darkening_shades} /></div>
              <div className='writeup-side-small'><h6>Room - darkening shades</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Entertain<span className='purple-tx'>ment</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.archade_games ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('archade_games')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.archade_games} /></div>
              <div className='writeup-side-small'><h6>Archade Games</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.bluetooth ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('bluetooth')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.bluetooth} /></div>
              <div className='writeup-side-small'><h6>Bluetooth</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.reading ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('reading')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.reading} /></div>
              <div className='writeup-side-small'><h6>Reading</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.game_console ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('game_console')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.game_console} /></div>
              <div className='writeup-side-small'><h6>Game Console</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.ping_pong_table ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('ping_pong_table')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.ping_pong_table} /></div>
              <div className='writeup-side-small'><h6>Ping Pong Table</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.pool_table ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('pool_table')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.pool_table} /></div>
              <div className='writeup-side-small'><h6>Pool Table</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.tv ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('tv')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.tv} /></div>
              <div className='writeup-side-small'><h6>TV</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Heating and <span className='purple-tx'>Cooling</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.ac ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('ac')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.ac} /></div>
              <div className='writeup-side-small'><h6>Air Conditioning</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.fans ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('fans')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.fans} /></div>
              <div className='writeup-side-small'><h6>Fans</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Home <span className='purple-tx'>Safety</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.monoxide_alarm ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('monoxide_alarm')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.monoxide_alarm} /></div>
              <div className='writeup-side-small'><h6>Monoxide Alarm</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.fire_extinguisher ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('fire_extinguisher')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.fire_extinguisher} /></div>
              <div className='writeup-side-small'><h6>Fire Extinguisher</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.first_aid_kit ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('first_aid_kit')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.first_aid_kit} /></div>
              <div className='writeup-side-small'><h6>First aid Kit</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.security_cameras ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('security_cameras')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.security_cameras} /></div>
              <div className='writeup-side-small'><h6>Security Cameras</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.smoke_alarm ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('smoke_alarm')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.smoke_alarm} /></div>
              <div className='writeup-side-small'><h6>Smoke Alarm</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Internet and <span className='purple-tx'>Office</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.dedicated_workspace ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('dedicated_workspace')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.dedicated_workspace} /></div>
              <div className='writeup-side-small'><h6>Dedicated Workspace</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.wifi ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('wifi')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.wifi} /></div>
              <div className='writeup-side-small'><h6>Wifi</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Out<span className='purple-tx'>door</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.bbq_grill ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('bbq_grill')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.bbq_grill} /></div>
              <div className='writeup-side-small'><h6>BBG Grill</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.outdoor_dining ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('outdoor_dining')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.outdoor_dining} /></div>
              <div className='writeup-side-small'><h6>Outdoor Dining</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.outdoor_furniture ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('outdoor_furniture')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.outdoor_furniture} /></div>
              <div className='writeup-side-small'><h6>Outdoor Furniture</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.patio_balcony ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('patio_balcony')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.patio_balcony} /></div>
              <div className='writeup-side-small'><h6>Patio or Balcony</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.backyard_fenced ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('backyard_fenced')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.backyard_fenced} /></div>
              <div className='writeup-side-small'><h6>Backyard Fully Fenced</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Parking and <span className='purple-tx'>Facilities</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.carpot ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('carpot')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.carpot} /></div>
              <div className='writeup-side-small'><h6>Free carport on premises</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.street_parking ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('street_parking')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.street_parking} /></div>
              <div className='writeup-side-small'><h6>Free street parking</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.private_pool ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('private_pool')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.private_pool} /></div>
              <div className='writeup-side-small'><h6>Private Pool</h6></div>
            </div>
          </div>

          <h4 className='blue-tx f700 pt-4 pb-3'>Serv<span className='purple-tx'>ices</span></h4>
          <div className='stack-flex pb-3'>
            <div className={'selection-grid' + (facilityInfo.lockbox ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('lockbox')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.lockbox} /></div>
              <div className='writeup-side-small'><h6>Lockbox</h6></div>
            </div>
            <div className={'selection-grid' + (facilityInfo.self_checkin ? ' active-feature' : '')} onClick={() => updateFacilityTickInfo('self_checkin')}>
              <div className='tick-side'><input type={'checkbox'} checked={!!facilityInfo.self_checkin} /></div>
              <div className='writeup-side-small'><h6>Self check-in</h6></div>
            </div>
          </div>
          
          <div className='spread-info'>
            <button type='button' className='recede-button px-4' onClick={previous}>Previous</button>
            <button type='button' className='proceed-button px-3' onClick={forward}>Save &amp; Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedInfoSect;
