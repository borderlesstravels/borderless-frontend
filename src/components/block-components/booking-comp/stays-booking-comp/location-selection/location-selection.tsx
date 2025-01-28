import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import TypeSuggestComponent from "../../../../base-components/type-suggest/type-suggest";
import "./location-selection.scss";
import { useFetchShortletsLocationsQuery } from "../../../../../store/apis/shortlets";

interface ILocationSelection {
  address: any;
  geolocation: any;
}
interface iLocationProps {
  setLocation: Function;
  componentState?: any;
  location?: ILocationSelection;
}

function LocationSelectionComp(props: iLocationProps) {
  const [showPopup, setShowPopup] = useState<0 | 1 | 2>(0);
  const [location, setLocation] = useState<ILocationSelection>(
    props.location || { address: undefined, geolocation: undefined }
  );
  const [confirmedLocation, setConfirmedLocation] =
    useState<ILocationSelection>(
      props.location || { address: undefined, geolocation: undefined }
    );

  const { data: shortletsData } = useFetchShortletsLocationsQuery();
  const shortletList = shortletsData?.data || [];

  const toggleShowPopup = (status?: 0 | 1 | 2) => {
    setShowPopup(status || 0);
  };

  const validate = (values: FormikValues) => {};

  const submitLocations = (values: FormikValues, controls: any) => {};

  const updateSelection = (data: any, type: "address" | "geolocation") => {
    const currentLocation = { ...location };
    if (type === "address") {
      currentLocation.address = data;
    } else {
      currentLocation.geolocation = data;
    }
    setLocation(currentLocation);
    setConfirmedLocation({ address: undefined, geolocation: undefined });
  };

  const confirmLocation = () => {
    setConfirmedLocation(location);
    toggleShowPopup(1);
  };

  useEffect(() => {
    if (location.address) {
      setConfirmedLocation(location);
      if (showPopup === 2) {
        toggleShowPopup(1);
      }
    }
  }, [location]);
  useEffect(() => {
    props.setLocation(confirmedLocation);
  }, [confirmedLocation]);

  return (
    <>
      {/* <div className='pt-3 pb-2'>
        <AppPopup
          switch={
            <div className='selector2' onClick={() => toggleShowPopup(2)} title={`${confirmedLocation?.address?.state || '...'}`}>
              <div className='label'><FontAwesomeIcon icon={'map-marker-alt'} className='fainter-tx' /> Location</div>
              <p className='mb-0'>
                {clipToLength(confirmedLocation?.address?.state, 10) || '...'}
              </p>
              <FontAwesomeIcon icon={'arrow-right-arrow-left'} />
            </div>
          }
          switchClass='w100-flat'
          showPopup={showPopup}
          onClosePopup={() => toggleShowPopup()}
        >
          <div className='location-case'>
            <div className='row'>
              <div className='col-12'>
                <div className='location-selection'>
                  <p className='reduced mb-0 mt-2'>Location</p>
                  <TypeSuggestComponent
                    data={shortletList}
                    typePlaceholder='Enter city name'
                    floatOption initialValue={location.address?.name}
                    selected={(data: any) => updateSelection(data, 'address')}
                    subKey='lga'
                    subKey2='state'
                    subKey3='country'
                    commaSeparated
                    listLength={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </AppPopup>
      </div> */}
      <div className="location-case pt-3 pb-2">
        <div
          className={
            "location-selection selector2" +
            (location.address?.state ? " selected-label" : "")
          }
        >
          <div className="label">
            <FontAwesomeIcon icon={"map-marker-alt"} className="fainter-tx" />{" "}
            Location
          </div>
          <TypeSuggestComponent
            data={shortletList}
            typePlaceholder="Enter location"
            floatOption
            initialValue={location.address?.lga}
            // initialValue={
            //   `
            //   ${location.address?.lga || ''}
            //   ${location.address?.state ? (', ' + location.address?.state) : ''}
            //   ${location.address?.country ? (', ' + location.address?.country) : ''}
            //   `
            // }
            selected={(data: any) => updateSelection(data, "address")}
            subKey="lga"
            subKey2="state"
            subKey3="country"
            commaSeparated
            listLength={20}
          />
          <FontAwesomeIcon
            className="fainter-tx"
            icon={"location-crosshairs"}
          />
        </div>
      </div>
    </>
  );
}

export default LocationSelectionComp;
