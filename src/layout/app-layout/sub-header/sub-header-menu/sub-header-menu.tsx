import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Path } from "../../../../navigations/routes";

import "./sub-header-menu.scss";

function SubHeaderMenu(props: {
  className: string;
  offSidebarVisible?: Function;
}) {
  const closeSideBar = () => {
    if (props.offSidebarVisible) {
      props.offSidebarVisible();
    }
  };

  useEffect(() => {}, [props]);

  return (
    <>
      <NavLink
        to={`/${Path.home2}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>Home</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
      <NavLink
        to={`/${Path.about}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>About</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
      <div className={props.className + " sub-link multi-case"}>
        <p className="multi">
          Hot Offers{" "}
          <FontAwesomeIcon icon={"sort-down"} className="offer-icon" />
        </p>
        <div className="bottom-holder">
          <NavLink
            to={`/${Path.offers}`}
            className={({ isActive }) => (isActive ? "active-multilink" : "")}
          >
            <div className="bottom-bar"></div>
          </NavLink>
        </div>
        <div className="pop-up">
          <NavLink
            to={`/${Path.offers}/${Path.skyflexPay}`}
            className={({ isActive }) => (isActive ? "active-subroute" : "")}
          >
            <p onClick={closeSideBar}>Skyflex Pay</p>
          </NavLink>
          <NavLink
            to={`/${Path.offers}/${Path.skyRewards}`}
            className={({ isActive }) => (isActive ? "active-subroute" : "")}
          >
            <p onClick={closeSideBar}>Sky Rewards</p>
          </NavLink>
          <NavLink
            to={`/${Path.offers}/${Path.travelOnCredit}`}
            className={({ isActive }) => (isActive ? "active-subroute" : "")}
          >
            <p onClick={closeSideBar}>Travel on Credit</p>
          </NavLink>
        </div>
      </div>
      <NavLink
        to={`/${Path.terms}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>Terms & Conditions</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
      <NavLink
        to={`/${Path.privacyPolicy}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>Privacy Policy</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
      <NavLink
        to={`/${Path.careers}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>Careers</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
      <NavLink
        to={`/${Path.contact}`}
        className={({ isActive }) =>
          `${props.className} ` + (isActive ? "active-sublink" : "")
        }
      >
        <div className="sub-link" onClick={closeSideBar}>
          <p>Contact</p>
          <div className="bottom-bar"></div>
        </div>
      </NavLink>
    </>
  );
}

export default SubHeaderMenu;
