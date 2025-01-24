import React, { useEffect, useState } from 'react';
import './stay-search-filter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IFilter, initialFilter, validateLocationFIlterInputs } from './stay-filter-service';
import { timeConstants } from '../../../../../services/constants/general constants';
import { formatNumber } from '../../../../../services/utils/data-manipulation-utilits';
import { iFullShortletInfo } from '../../../../host/add-stay/add-shortlet/add-shortlet-data';

interface IFilterProps {
  list: iFullShortletInfo[];
  updateList: Function;
  children: any;
  status?: boolean;
}

function StaySearchFilter({list, updateList, children, status}: IFilterProps) {

  const [selectedTab, setSelectedTab] = useState<'cheapest' | 'best' | 'quickest'>('best');
  const [filterOpened, setFilterOpened] = useState(false);
  const [filter, setFilter] = useState<IFilter>(initialFilter());
  const [canFilter, setCanFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [quickestTime, setQuickestTime] = useState(0);
  const [cheapestPrice, setCheapestPrice] = useState(0);
  const [locationList, setLocationList] = useState<{lga: string, state: string, country: string}[]>([]);
  const [updatedList, setUpdatedList] = useState<iFullShortletInfo[]>([]);

  const changeFilterState = (state: boolean) => {
    const selector = window.innerWidth > 991 ? false : state;
    setFilterOpened(selector);
  }
  
  const updateSelectedTab = (tab: 'cheapest' | 'best' | 'quickest', active?: any[]) => {
    const acctiveList = active || updatedList;
    switch(tab) {
      case 'cheapest':
        const cheapest = [...acctiveList].sort((a, b) => a.price - b.price); 
        setUpdatedList(cheapest);
        break;
      case 'best':
        setUpdatedList(acctiveList);
        break;
      case 'quickest':
        const quickest = [...acctiveList].sort((a, b) => a.total_duration - b.total_duration);
        setUpdatedList(quickest);
    }
    setSelectedTab(tab);
  }

  const updateFilter = (ev: any, key: string) => {
    const value = ev.target.value;
    const newFIlter: any = {...filter};
    newFIlter[key] = value;
    setFilter(newFIlter);
  }

  const validateFilter = (key: string, ev?: any) => {
    const { updatedFilter, changed } = validateLocationFIlterInputs(key, filter, ev?.target?.value);
    if(changed) setFilter(updatedFilter);
  }

  const selectLocation = (location: string) => {
    const newFIlter = {...filter};
    if(newFIlter.locations.includes(location)) {
      newFIlter.locations = newFIlter.locations.filter(item => item !== location);
    } else {
      newFIlter.locations.push(location);
    }
    setFilter(newFIlter);
  }

  const clearFilter = () => {
    setFilter(initialFilter());
    setActiveFilter(false);
    setUpdatedList(list);
  }

  const searchFilter = () => {
    let filteredList = [...list];
    if(filter.locations.length > 0){
      const tempList: any = [];
      filteredList.map((item: any) => {
        filter.locations.map(location => {
          if(item?.lga === location && !tempList.includes(item)) {tempList.push(item)}
        })
      });
      filteredList = tempList;
    }
    if(filter.min){
      const tempList: any = [];
      filteredList.map((item: any) => {
        if(item.price >= (filter.min || 0)) {
          tempList.push(item)
        }
      });
      filteredList = tempList;
    }
    if(filter.max){
      const tempList: any = [];
      filteredList.map((item: any) => {
        if(item.price <= (filter.max || 0)) {
          tempList.push(item)
        }
      });
      filteredList = tempList;
    }
    if(filter.earlyestTime){
      const tempList: any = [];
      filteredList.map((item: any) => {
        const earlyMark = `2024-06-04T${filter.earlyestTime}:00:00.000Z`;
        const stayTime = `2024-06-04T${item?.outbound[0]?.departure_time?.split('T')[1]}.000Z`;
        if(new Date(earlyMark).getTime() < new Date(stayTime).getTime()) {
          tempList.push(item);
        }
      });
      filteredList = tempList;
    }
    if(filter.latestTime){
      const tempList: any = [];
      filteredList.map((item: any) => {
        const lateMark = `2024-06-04T${filter.latestTime}:00:00.000Z`;
        const stayTime = `2024-06-04T${item?.outbound[0]?.departure_time?.split('T')[1]}.000Z`;
        if(new Date(lateMark).getTime() > new Date(stayTime).getTime()) {
          tempList.push(item);
        }
      });
      filteredList = tempList;
    }
    setActiveFilter(true);
    setUpdatedList(filteredList);
    updateSelectedTab('best', filteredList);
  }

  useEffect(() => {
    const locationObg: any = {};
    const locations: {lga: string, state: string, country: string}[] = [];
    let listPirce = 0;
    let fastestTime = 0;
    list.map((stay: iFullShortletInfo) => {
      if(!listPirce || (listPirce > (stay?.price || 0))) {
        listPirce = stay?.price || 0;
      }
      // if(!fastestTime || (fastestTime > stay?.total_duration)) {
      //   fastestTime = stay?.total_duration;
      //   console.log({ffff: stay?.total_duration})
      // }
      locationObg[stay?.lga] = {
        lga: stay?.lga,
        state: stay?.state,
        country: stay?.country
      };
    });
    setCheapestPrice(listPirce);
    setQuickestTime(fastestTime);
    for(let item in locationObg) {
      if(item && locationObg[item]) {
        locations.push(locationObg[item]);
      }
    }
    setLocationList(locations);
    clearFilter();
    setSelectedTab('best');
  }, [list]);

  useEffect(() => {
    if(filter.min || filter.max || filter.earlyestTime || filter.latestTime || filter.locations.length > 0) {
      setCanFilter(true);
    } else {
      setCanFilter(false);
    }
  }, [filter]);

  useEffect(() => {
    updateList(updatedList);
  }, [updatedList]);
  
  return (
    <div className='row filter-holder'>
      <div className='col-lg-3'>
        <div className='spread-info pb-4'>
          <h3 className='f700 blue-tx mb-0'>Filters</h3>
          {!filterOpened && <FontAwesomeIcon icon={'chevron-down'} className='increased' onClick={() => changeFilterState(true)} />}
          {filterOpened && <FontAwesomeIcon icon={'chevron-up'} className='increased' onClick={() => changeFilterState(false)} />}
        </div>
        <div className={'filter ' + (filterOpened ? 'opened-filter' : 'closed-filter')}>
          <div className='spread-info'>
            <p className='mb-0 f600'>Price</p>
            {/* <FontAwesomeIcon icon={'chevron-up'} className='faint-tx reduced' /> */}
          </div>
          <div className='info-grid py-2'>
            <div className=''>
              <label className='reduced-x f500'>Minimum</label>
              <input
                type="number"
                name="min"
                value={filter.min}
                onChange={(e) => updateFilter(e, 'min')}
                onBlur={() => validateFilter('min')}
                className='simple-input'
                placeholder='Minimum'
              />
            </div>
            <div className=''>
              <label className='reduced-x f500'>Maximum</label>
              <input
                type="number"
                name="max"
                value={filter.max}
                onChange={(e) => updateFilter(e, 'max')}
                onBlur={() => validateFilter('max')}
                className='simple-input'
                placeholder='Maximum'
              />
            </div>
          </div>
          {/* <hr className='' />
          <div className='spread-info'>
            <p className='mb-0 f600'>Depature Time</p>
          </div>
          <div className='info-grid py-2'>
            <div className=''>
              <label className='reduced-x f500'>Earliest</label>
              <select
                value={filter.earlyestTime}
                onChange={(e) => {updateFilter(e, 'earlyestTime'); validateFilter('earlyestTime', e)}}
                className='simple-input'
              >
                <option value="">Choose time</option>
                {timeConstants.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)}
              </select>
            </div>
            <div className=''>
              <label className='reduced-x f500'>Latest</label>
              <select
                value={filter.latestTime}
                onChange={(e) => {updateFilter(e, 'latestTime'); validateFilter('latestTime', e)}}
                className='simple-input'
              >
                <option value="">Choose time</option>
                {timeConstants.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)}
              </select>
            </div>
          </div> */}
          <hr />
          <div className='spread-info'>
            <p className='mb-0 f600'>Locations</p>
          </div>
          {
            locationList.map((location, index) => (
              <div className='pt-2' key={index}>
                <input
                  type="checkbox"
                  value={location.lga}
                  checked={filter.locations.includes(location.lga)}
                  onChange={() => selectLocation(location.lga)}
                  name={location.lga}
                />
                <span className='reduced-soft-im f500 px-2'>{location.lga} ({location.state})</span>
              </div>
            ))
          }
          {/* <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Fly Dubai</span>
          </div>
          <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Qatar Airways</span>
          </div>
          <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Air Peace</span>
          </div>
          <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Etihad</span>
          </div> */}
          <hr />
          {/* <div className='spread-info'>
            <p className='mb-0 f600'>Trips</p>
            <FontAwesomeIcon icon={'chevron-up'} className='faint-tx reduced' />
          </div>
          <div className='py-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Round trip</span>
          </div>
          <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>One Way</span>
          </div>
          <div className='pb-2'>
            <input type="checkbox" name="" id="" />
            <span className='reduced-soft-im f500 px-2'>Multi-City</span>
          </div> */}
          <div className='info-grid py-2'>
            <button type="button" className={'red-button' + ((canFilter || activeFilter) ? '' : ' deactivated')} onClick={clearFilter}>Clear</button>
            <button type="button" className={'purple-button' + (canFilter ? '' : ' deactivated')} onClick={searchFilter}>Filter</button>
          </div>
        </div>
      </div>
      <div className='col-lg-9'>
        <div className='pad-web'>
          <div className='category-tabs'>
            <div className={'category-tab' + (selectedTab ==='cheapest' ? ' active' : '')} onClick={() => updateSelectedTab('cheapest')}>
              <h6 className='mb-0'>Cheapest</h6>
              <p className='mb-0 number-light'>
                <span className='reduced-im'>
                  {/* {list[0]?.currency}  */}
                </span> 
                {formatNumber(Math.ceil(cheapestPrice))}
              </p>
            </div>
            <div className='center-info py-2'>
              <div className='splitter'></div>
            </div>
            <div className={'category-tab' + (selectedTab ==='best' ? ' active' : '')} onClick={() => updateSelectedTab('best')}>
              <h6 className='mb-0'>Best</h6>
              <p className='mb-0 number-light'>: &nbsp; : &nbsp; : &nbsp; :</p>
            </div>
            <div className='center-info py-2'>
              <div className='splitter'></div>
            </div>
            <div className={'category-tab' + (selectedTab ==='quickest' ? ' active' : '')} onClick={() => updateSelectedTab('quickest')}>
              <h6 className='mb-0'>Quickest</h6>
              <p className='mb-0 number-light'>{Math.floor(quickestTime/60)}Hs, {quickestTime % 60}Ms</p>
            </div>
          </div>

          {children}

        </div>
      </div>
    </div>
  );
}

export default StaySearchFilter;
