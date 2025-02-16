import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogoWhite } from "../../assets/images";
import { iStoreState } from "../../services/constants/interfaces/store-schemas";
import { routeConstants } from "../../services/constants/route-constants";
import SubHeaderMenu from "../sub-header/sub-header-menu/sub-header-menu";

import "./sidebar.scss";

function Sidebar(props: any) {

  const userDetails = useSelector((state: iStoreState) => state?.user || {});
  const userType: 'user' | 'host' = useSelector((state: iStoreState) => state?.user?.userMode || 'user');

  useEffect(() => {}, [props]);

  return (
    <div className="bar">
      <div className="spread-info m-open-md">
        <div className="white-logo">
          <img src={LogoWhite} alt="" />
        </div>
        <FontAwesomeIcon icon={'times'} className="menu-icon" onClick={props.toggleSidebarVisible} />
      </div>
      <div className="m-open-sm"></div>
      <div className="lined-icons">
        <div className="sect m-open-md">
          <SubHeaderMenu className="mobile-version" offSidebarVisible={props.offSidebarVisible} />
        </div>

        <div className="c-sect">
          <div className={"menu-grid2 m-close-md-im" + (props.sidebarVisible ? ' menu-grid-active' : '')}>
            <div className="circles">
              <div className="blue"></div>
              <div className="orange"></div>
              <div className="light-blue"></div>
            </div>
            <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
              <p className="mb-0"></p>
            </div>
          </div>
        </div>

        {
          userDetails.email_verified &&
          <>
            <div className="sect">
              <NavLink to={`/${routeConstants.profile}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
                <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
                  <div className="sibebar-icon">
                    < FontAwesomeIcon icon={'user'} />
                    <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                      <span>My&nbsp;Profile</span>
                    </div>
                  </div>
                  <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                    <p className="mb-0 pt-2">My&nbsp;Profile</p>
                  </div>
                </div>
              </NavLink>
            </div>

            <hr className="separation-line" />
          </>
        }

        <div className="sect">
          <NavLink to={`/${routeConstants.flights}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'plane'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Flights</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Flights</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.stays}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'bed'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Stays</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Stays</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.bookRides}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'car'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Book&nbsp;Ride</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Book&nbsp;Ride</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.rewards}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'gift'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Rewards</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Rewards</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.deals}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'handshake-angle'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Deals</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Deals</p>
              </div>
            </div>
          </NavLink>
        </div>

        <hr className="separation-line" />

        <div className="sect">
          <NavLink to={`/${routeConstants.explore}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'globe'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Explore</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Explore</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.travelInfo}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'info'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Travel&nbsp;Info</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Travel&nbsp;Info</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/${routeConstants.flightTracker}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'map-location-dot'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Flight&nbsp;Tracker</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Flight&nbsp;Tracker</p>
              </div>
            </div>
          </NavLink>
        </div>

        <hr className="separation-line" />

        {
          userDetails.email_verified && userDetails.userMode === 'user' &&
          <>
            <div className="sect">
              <NavLink to={`/${routeConstants.myBookings}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
                <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
                  <div className="sibebar-icon">
                    < FontAwesomeIcon icon={'suitcase-rolling'} />
                    <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                      <span>My&nbsp;Bookings</span>
                    </div>
                  </div>
                  <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                    <p className="mb-0 pt-2">My&nbsp;Bookings</p>
                  </div>
                </div>
              </NavLink>
            </div>

            <hr className="separation-line" />
          </>
        }

        <div className="sect">
          <NavLink to={`/${routeConstants.feedBack}`} className={({isActive}) => isActive ? 'active-sidebar-link' : ''}>
            <div className={"menu-grid" + (props.sidebarVisible ? ' menu-grid-active' : '')}  onClick={props.offSidebarVisible}>
              <div className="sibebar-icon">
                < FontAwesomeIcon icon={'message'} />
                <div className={"sidebar-icon-popup" + (props.sidebarVisible ? '' : ' icon-pop')}>
                  <span>Feedback</span>
                </div>
              </div>
              <div className={" " + (props.sidebarVisible ? 'menu-active' : 'menu-default')}>
                <p className="mb-0 pt-2">Feedback</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
