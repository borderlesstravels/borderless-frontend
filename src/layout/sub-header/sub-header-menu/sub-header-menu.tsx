import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { routeConstants } from "../../../services/constants/route-constants";

import "./sub-header-menu.scss";

function SubHeaderMenu(props: {className: string, offSidebarVisible?: Function}) {

  const closeSideBar = () => {
    if(props.offSidebarVisible) {
      props.offSidebarVisible();
    }
  }

  useEffect(() => {}, [props]);

  return (
    <>
      <NavLink to={`/${routeConstants.home2}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>Home</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
      <NavLink to={`/${routeConstants.about}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>About</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
      <div className={props.className + " sub-link multi-case"}>
        <p className="multi">Hot Offers <FontAwesomeIcon icon={'sort-down'} className="offer-icon" /></p>
        <div className="bottom-holder">
          <NavLink to={`/${routeConstants.offers}`} className={({isActive}) => isActive ? 'active-multilink' : ''}>
            <div className="bottom-bar"></div>
          </NavLink>
        </div>
        <div className="pop-up">
          <NavLink to={`/${routeConstants.offers}/${routeConstants.skyflexPay}`} className={({isActive}) => isActive ? 'active-subroute' : ''}>
            <p onClick={closeSideBar}>Skyflex Pay</p>
          </NavLink>
          <NavLink to={`/${routeConstants.offers}/${routeConstants.skyRewards}`} className={({isActive}) => isActive ? 'active-subroute' : ''}>
            <p onClick={closeSideBar}>Sky Rewards</p>
          </NavLink>
          <NavLink to={`/${routeConstants.offers}/${routeConstants.travelOnCredit}`} className={({isActive}) => isActive ? 'active-subroute' : ''}>
            <p onClick={closeSideBar}>Travel on Credit</p>
          </NavLink>
        </div>
      </div>
      <NavLink to={`/${routeConstants.terms}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>Terms & Conditions</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
      <NavLink to={`/${routeConstants.privacyPolicy}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>Privacy Policy</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
      <NavLink to={`/${routeConstants.careers}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>Careers</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
      <NavLink to={`/${routeConstants.contact}`} className={({isActive}) => `${props.className} ` + (isActive ? 'active-sublink' : '')}>
      <div className="sub-link" onClick={closeSideBar}>
        <p>Contact</p>
        <div className="bottom-bar"></div>
      </div>
      </NavLink>
    </>
  );
}

export default SubHeaderMenu;
