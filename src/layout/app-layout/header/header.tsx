import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogoBlack } from "../../../assets/images";

import "./header.scss";
import SearchComponent from "./search-component/search-component";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../../services/utils/request";
import {
  handleLogout,
  selectUser,
  selectUserMode,
} from "../../../store/features/user";

function Header(props: any) {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUser);
  const userType = useSelector(selectUserMode);
  const dispatch = useDispatch();

  const navigateTo = (link: string) => {
    navigate(link);
  };

  const logOut = () => {
    sendRequest(
      {
        url: userType === "user" ? "user-auth/logout" : "host-profile/logout",
        method: "POST",
        body: {},
      },
      () => {
        dispatch(handleLogout());
        // dispatch(userLogout());
        navigateTo(`${Path.home}`);
      },
      () => {
        dispatch(handleLogout());
        // dispatch(userLogout());
        navigateTo(`${Path.home}`);
      }
    );
  };

  useEffect(() => {}, [props]);

  return (
    <>
      <div className="header">
        <div className="spread-info overlap-sidebar-index">
          <FontAwesomeIcon
            icon={"bars"}
            className="menu-icon"
            onClick={props.toggleSidebarVisible}
          />
          <div className="logo">
            <img src={LogoBlack} alt="" />
          </div>
        </div>
        <div className="search-sect">
          <SearchComponent />
          <div className="center-info">
            <FontAwesomeIcon icon={"search"} />
          </div>
        </div>
        <div className="account-buttons">
          <div className="icon-holder center-info m-open-sm">
            <FontAwesomeIcon icon={"search"} className="m-open-sm" />
          </div>
          {!userDetails?.email ? (
            <>
              <button
                className="login"
                onClick={() => navigateTo(`/${Path.login}`)}
              >
                Login
              </button>
              <button
                className="signup"
                onClick={() => navigateTo(`/${Path.signup}`)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button className="signup" onClick={logOut}>
              Log Out
            </button>
          )}
          <select name="" id="" className="language m-close-sm">
            <option value="english">EN</option>
            <option value="french">FR</option>
          </select>
          <button className="currency m-close-sm">$ USD</button>
        </div>
      </div>
      <div className="header-spacer"></div>
    </>
  );
}

export default Header;
