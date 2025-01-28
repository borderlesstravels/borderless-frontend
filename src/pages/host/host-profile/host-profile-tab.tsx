import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProfileOverviewPage from "../../user/profile/user-profile/profile-overview/profile-overview";
import ProfileSettingsPage from "../../user/profile/user-profile/profile-settings/profile-settings";
import "./host-profile-tab.scss";
import { useSelector } from "react-redux";
import {
  iStoreState,
  IUserData,
} from "../../../services/constants/interfaces/store-schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileSect from "./profile-sect/profile-sect";
import ReviewsSect from "./reviews-sect/reviews-sect";
import PropertiesSect from "./properties-sect/properties-sect";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../navigations/routes";
import { sendRequest } from "../../../services/utils/request";
import { toast } from "react-toastify";
import { AvatarIcon } from "../../../assets/images";
import AppModal from "../../../components/block-components/app-modal/app-modal";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { HOST_AVATAR_IMAGES } from "../../../constants/resourceLinks";
import {
  handleLogin,
  handleLogout,
  selectUser,
  selectUserMode,
} from "../../../store/features/user";
import { Api } from "../../../types";

function HostProfilePage(props: any) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [activeTab, setActiveTab] = useState<
    "profile" | "reviews" | "properties" | "bookings" | string
  >(params.tab || "profile");
  const user = useSelector(selectUser);
  const userMode = useSelector(selectUserMode);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [uploadImage, setUploadImage] = useState();
  const [showUpdateImageModal, setShowUpdateImageModal] =
    useState<boolean>(false);

  const modalRef = useRef<any>(null);

  const goToNewProperty = () => {
    navigate(`/${Path.addShortlet}`);
  };
  const viewBookings = () => {
    navigate(`/${Path.hostBookings}`);
  };

  const getNotifications = () => {
    sendRequest(
      {
        url: "host-profile/notifications",
        method: "GET",
        catchAuthError: () => dispatch(handleLogout()),
      },
      (res: any) => {
        setNotifications(res.data || []);
      },
      (err: any) => {}
    );
  };

  const selectImage = () => {
    document.getElementById("update-image")?.click();
  };

  const captureSelectedImage = (ev: any) => {
    if (ev.target.files[0]) {
      setUploadImage(ev.target.files[0]);
      setShowUpdateImageModal(true);
      console.log("Avidos", { user });
    }
  };

  const updateImage = () => {
    if (uploadImage) {
      const formData = new FormData();
      formData.append("avatar", uploadImage);
      toast.info("Image is being saved in the background");
      sendRequest(
        {
          url: "host-profile/update-profile-avatar",
          method: "PUT",
          body: formData,
        },
        (res: any) => {
          toast.success(res?.message);
          getUser();
        },
        (err: any) => {}
      );
    }
  };

  const closeModal = (type: any) => {
    if (type) {
      modalRef.current?.closeModal();
      if (type === 2) {
        updateImage();
      }
    }
    setTimeout(() => setShowUpdateImageModal(false), 500);
  };

  const getUser = () => {
    sendRequest(
      {
        url: userMode === "user" ? "user-profile/user" : "host-profile/profile",
        method: "GET",
      },
      (res: any) => {
        dispatch(
          handleLogin({
            mode: userMode as Api.General.UserMode,
            user: res.user,
          })
        );
      },
      (err: any) => {}
    );
  };

  useEffect(() => {
    getNotifications();
    console.log({ modalRef });
    console.log("Avidos", { user });
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);

  return (
    <>
      <div className="host-holder">
        <div className="host-main-grid">
          <div className="main-sect">
            <div className="profile-tab-card h-balance">
              <div className="spread-info-front pb-2">
                <div className="profile-image">
                  <img
                    src={
                      user?.avatar
                        ? HOST_AVATAR_IMAGES + user.avatar
                        : AvatarIcon
                    }
                    alt=""
                  />
                  <div className="edit" onClick={selectImage}>
                    <FontAwesomeIcon icon={"pencil"} />
                    <input
                      type="file"
                      name=""
                      id="update-image"
                      onChange={captureSelectedImage}
                    />
                  </div>
                </div>
                <div>
                  <h5 className="f700 mb-2">
                    {user?.first_name} {user?.last_name}
                  </h5>
                  <div className="spread-info-front">
                    <FontAwesomeIcon icon={"star"} className="mr-2 reduced" />
                    <span className="reduced number-medium px-2">
                      ({notifications.length}) Unread notifications
                    </span>
                  </div>
                </div>
              </div>
              <div className="spread-info-front">
                <div className="pr-3">
                  <FontAwesomeIcon
                    icon={"star"}
                    className="orange-tx mr-2 reduced"
                  />
                  <span className="reduced-x pl-1 pr-2 number-light">
                    {" "}
                    {4.3} ({343} reviews){" "}
                  </span>
                </div>
                <div className="">
                  <span>&nbsp;</span>
                  <FontAwesomeIcon
                    icon={"house"}
                    className="faint-tx mr-2 reduced"
                  />
                  <span className="reduced-x pl-1 number-light">
                    {" "}
                    {4.3} properties
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="main-sect">
            <div className="profile-tab-card h-balance">
              <div className="spread-info mb-3 pb-1">
                <h4 className="f700 mb-0">My Tabs</h4>
                <div className="tab-button-sect ">
                  <button onClick={viewBookings} className="px-4">
                    Bookings
                  </button>
                </div>
              </div>
              <div className="tab-grid">
                <div
                  className={
                    "tab-button-sect " +
                    (activeTab === "profile" ? "active-tab" : "")
                  }
                >
                  <button onClick={() => setActiveTab("profile")}>
                    Profile
                  </button>
                </div>
                <div
                  className={
                    "tab-button-sect " +
                    (activeTab === "reviews" ? "active-tab" : "")
                  }
                >
                  <button onClick={() => setActiveTab("reviews")}>
                    Reviews
                  </button>
                </div>
                <div
                  className={
                    "tab-button-sect " +
                    (activeTab === "properties" ? "active-tab" : "")
                  }
                >
                  <button onClick={() => setActiveTab("properties")}>
                    Properties
                  </button>
                </div>
                <div className="tab-button-sect">
                  <button onClick={goToNewProperty}>New Property</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="host-tab-content">
          {activeTab === "profile" && (
            <ProfileSect notifications={notifications} />
          )}
          {activeTab === "reviews" && <ReviewsSect />}
          {activeTab === "properties" && <PropertiesSect />}
        </div>
      </div>
      {showUpdateImageModal && (
        <AppModal styleClass="" small onCloseModal={closeModal} ref={modalRef}>
          <div className="action-popup p-3">
            <p className="text-center">
              You are attempting to change your profile picture
            </p>
            <div className="info-grid">
              <button onClick={() => closeModal(1)} className="reject-button">
                {"Cancel"}
              </button>
              <button onClick={() => closeModal(2)} className="accept-button">
                {"Update"}
              </button>
            </div>
          </div>
        </AppModal>
      )}
    </>
  );
}

export default HostProfilePage;
