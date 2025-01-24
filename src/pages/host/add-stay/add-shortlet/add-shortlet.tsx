import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MiniLoader from '../../../../components/block-components/mini-loader/mini-loader';
import { sendRequest } from '../../../../services/utils/request';
import BasicInfoSect from './-basic-info/basic-info';
import { iAdvancedInfo, iBasicInfo, sampleAdvancedInfo, sampleBasicInfo } from './add-shortlet-data';
import './add-shortlet.scss';
import AdvancedInfoSect from './advanced-info/advanced-info';
import PublishPropertySect from './publish-property/publish-property';

function AddShortletPage(props: any) {

  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState<'basic information' | 'advance information' | 'publish property'>('basic information');
  const [basicInfoData, setBasicInfoData] = useState<iBasicInfo>(sampleBasicInfo);
  const [advancedInfoData, setAdvancedInfoData] = useState<iAdvancedInfo>(sampleAdvancedInfo);
  const [loaded, setLoaded] = useState(false);

  const alterSelectedTab = (tab: 'basic information' | 'advance information' | 'publish property') => {
    window.scrollTo(0, 0);
    setSelectedTab(tab); 
  }
  const setSelectedTab2 = (tab: 'basic information' | 'advance information' | 'publish property') => {
    if(window.location.origin === 'http://localhost:3001') {
      setSelectedTab(tab); 
    }
  }

  const proceedToAdvanced = (data: iBasicInfo) => {
    setBasicInfoData(data);
    console.log({amber: data});
    alterSelectedTab('advance information');
  }

  const revertToBasic = (data: iAdvancedInfo) => {
    setAdvancedInfoData(data);
    alterSelectedTab('basic information');
  }

  const proceedToPublish = (data: iAdvancedInfo) => {
    setAdvancedInfoData(data);
    alterSelectedTab('publish property');
  }

  const revertToAdvanced = () => {
    alterSelectedTab('advance information');
  }

  const getProperties = () => {
    sendRequest({
        url: 'host-profile/listing/' + id,
        method: 'GET',
    }, (res: any) => {
        // setProperties(res.data || []);
    }, (err: any) => {});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if(id) {
      getProperties();
    }
  }, [props]);
  
  return (
    <div className='add-shortlet'>
      <div className='category-tabs'>
        <div className={'category-tab' + (selectedTab ==='basic information' ? ' active' : '')} onClick={() => setSelectedTab2('basic information')}>
          <div className='center-info py-2'>
            <FontAwesomeIcon icon={'layer-group'} className={selectedTab === 'basic information' ? ' purple-tx' : ''} />
            <h6 className='mb-0'>Basic <span className='m-close-md'>Information</span></h6>
          </div>
        </div>
        <div className={'category-tab' + (selectedTab ==='advance information' ? ' active' : '')} onClick={() => setSelectedTab2('advance information')}>
          <div className='center-info py-2'>
            <FontAwesomeIcon icon={'clipboard'} className={selectedTab === 'advance information' ? ' purple-tx' : ''} />
            <h6 className='mb-0'>Advance <span className='m-close-md'>Information</span></h6>
          </div>
        </div>
        <div className={'category-tab' + (selectedTab ==='publish property' ? ' active' : '')} onClick={() => setSelectedTab2('publish property')}>
          <div className='center-info py-2'>
            <FontAwesomeIcon icon={'play-circle'} className={selectedTab === 'publish property' ? ' purple-tx' : ''} />
            <h6 className='mb-0'>Publish <span className='m-close-md'>Property</span></h6>
          </div>
        </div>
      </div>
      {
        (loaded || !id) ?
        <>
          {selectedTab === 'basic information' && <BasicInfoSect data={basicInfoData} proceed={proceedToAdvanced} />}
          {selectedTab === 'advance information' && <AdvancedInfoSect data={advancedInfoData} proceed={proceedToPublish} revert={revertToBasic} />}
          {selectedTab === 'publish property' && <PublishPropertySect basicData={basicInfoData} advancedData={advancedInfoData} revert={revertToAdvanced} />}
        </> :
        <div className='loader-holder-40 py-4'>
          <MiniLoader/>
        </div>
      }
    </div>
  );
}

export default AddShortletPage;
