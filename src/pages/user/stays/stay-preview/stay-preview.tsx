import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MiniLoader from "../../../../components/block-components/mini-loader/mini-loader";
import { Path } from "../../../../navigations/routes";
import {
  FlightPreviwImg as StayPreviwImg,
  PlaneTripIcon,
} from "../../../../assets/images";
import {
  formatDate,
  formatNumber,
  stringifyFilter,
} from "../../../../services/utils/data-manipulation-utilits";
import { sendRequest } from "../../../../services/utils/request";
import {
  calculatePrice,
  formatTime,
  selectAppartmentCategory,
} from "../stay-search/stay-search-service";
import "./stay-preview.scss";
import { iFullShortletInfo } from "../../../host/add-stay/add-shortlet/add-shortlet-data";
import { pickCurrency } from "../../../../services/utils/currency-handler";
import AmenitiesPage from "./amenities/amenities";
import { useSearchParams } from "react-router-dom";
import ReviewsComp from "../../../../components/block-components/reviews-comp/reviews-sect";
import { SHORTLET_IMAGES } from "../../../../constants/resourceLinks";

function StayPreviewPage(props: any) {
  const navigate = useNavigate();
  const stayId = useParams().id || "";
  const [loading, setLoading] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);
  const [stayDetails, setStayDetails] = useState<iFullShortletInfo>();
  const [tab, setTab] = useState<
    "photos" | "amenities" | "reviews" | "location"
  >("photos");
  const [activeImage, setActiveImage] = useState("");
  const hostMode = props?.hostMode;
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const updateTab = (
    active: "photos" | "amenities" | "reviews" | "location"
  ) => {
    setTab(active);
  };

  const getStayDetails = () => {
    setLoading(0);

    sendRequest(
      {
        url: "shortlet/fetch-shortlet/" + stayId,
        method: "GET",
      },
      (res: any) => {
        const refinedData = res.data;
        refinedData.images = res.data.images
          .split(", ")
          .map((image: string) => SHORTLET_IMAGES + image);
        setStayDetails(refinedData);
        setActiveImage(refinedData.images[0]);
        console.log({ refinedData });
        setLoading(1);
      },
      (err: any) => {
        setLoading(2);
      }
    );
  };

  const loadReviews = () => {
    setReviewsLoading(0);

    sendRequest(
      {
        url: "shortlet/fetch-shortlet-reviews/" + stayId,
        method: "GET",
      },
      (res: any) => {
        setReviewsList(res.data || []);
        setReviewsLoading(1);
      },
      (err: any) => {
        setReviewsLoading(2);
      }
    );
  };

  const reloadData = () => {
    getStayDetails();
  };

  const exitPage = () => {
    hostMode
      ? navigate(`/${Path.profile}/${stayId}`)
      : navigate(`/${Path.stays}`);
  };

  const bookStay = (id: string) => {
    navigate(`/${Path.stayBooking}/${id}${stringifyFilter(params)}`);
  };

  const editProperty = (id: string) => {
    navigate(`/${Path.editShortlet}/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getStayDetails();
    console.log(params);
  }, [props]);

  useEffect(() => {
    if (tab === "reviews" && reviewsLoading === 0) {
      loadReviews();
    }
    getStayDetails();
  }, [tab]);

  return (
    <>
      {loading === 0 && (
        <div className="loader-holder">
          <MiniLoader />
        </div>
      )}
      {loading === 2 && (
        <div className="loader-holder">
          <div className="error-box">
            <h3>An error occured while loading</h3>
            <button
              className="my-2 mx-2 confirmation-button"
              onClick={reloadData}
            >
              Reload
            </button>
            <button className="my-2 mx-2 cancel" onClick={exitPage}>
              Exit
            </button>
          </div>
        </div>
      )}
      {loading === 1 && (
        <div className="stay-preview">
          <div className="preview-sect">
            <h5>
              <span className="orange-tx">{stayDetails?.country} </span>{" "}
              <span className="px-2 fainter-tx"> &gt; </span>
              <span className="orange-tx"> {stayDetails?.state} </span>{" "}
              <span className="px-2 fainter-tx"> &gt; </span>
              <span className="increased-soft">
                {" "}
                {selectAppartmentCategory(stayDetails).type}{" "}
              </span>
            </h5>
            <div className="spread-info-web pt-3 pb-2">
              <h2 className="f700">{stayDetails?.apartment_name}</h2>
              <h2 className="pt-2 orange-tx increased-x number-bold">
                <span className="reduced-im">{pickCurrency("₦")}</span>{" "}
                {calculatePrice(stayDetails)}
              </h2>
            </div>

            <div className="spread-info-web pb-3"></div>

            <div className="spread-info-web pb-3">
              <p className="faint-tx py-2 mb-0">
                <FontAwesomeIcon icon={"map-marker"} /> -- &nbsp;
                {stayDetails?.address}
              </p>
              <div className="description-grid-50">
                <div className="center-info save-stay">
                  <FontAwesomeIcon icon={"heart"} className="save-icon" />
                </div>
                <div className="pl-3">
                  {hostMode ? (
                    <button
                      className="stay-button"
                      onClick={() => editProperty(stayDetails?._id || "")}
                    >
                      Edit Property
                    </button>
                  ) : (
                    <button
                      className="stay-button"
                      onClick={() => bookStay(stayDetails?._id || "")}
                    >
                      Rent Place
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="spread-info-web">
              <div className="tab-grid">
                <div className="grid-tab">
                  <button
                    className={tab === "photos" ? "active-tab-button" : ""}
                    onClick={() => updateTab("photos")}
                  >
                    Photos
                  </button>
                </div>
                <div className="grid-tab">
                  <button
                    className={tab === "amenities" ? "active-tab-button" : ""}
                    onClick={() => updateTab("amenities")}
                  >
                    Amenities
                  </button>
                </div>
                <div className="grid-tab">
                  <button
                    className={tab === "reviews" ? "active-tab-button" : ""}
                    onClick={() => updateTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>
                <div className="grid-tab">
                  <button
                    className={tab === "location" ? "active-tab-button" : ""}
                    onClick={() => updateTab("location")}
                  >
                    Location
                  </button>
                </div>
              </div>
              <div className="back-sect" onClick={exitPage}>
                <div className="return">
                  <FontAwesomeIcon icon={"chevron-left"} />
                </div>
                <h6 className="mb-0 orange-tx ps-2">Back</h6>
              </div>
            </div>

            {tab === "photos" && (
              <div>
                <div className="row pt-3 pb-4">
                  <div className="col-md-6">
                    <div className="imh">
                      <img src={activeImage} alt="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row auto-scroll max-h60">
                      {stayDetails?.images?.map((image, index) => (
                        <div className="col-6 px-1" key={index}>
                          <div className="imh pb-2">
                            <img
                              src={image}
                              alt=""
                              onClick={() => setActiveImage(image)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <div className="py-5 bordered-top-bottom">
                    <h3 className="font-weight-bold">Overview</h3>
                    <p className="mb-0">{stayDetails?.description}</p>
                  </div>
                </div>
              </div>
            )}

            {tab === "amenities" && (
              <div className="py-5">
                <AmenitiesPage stayDetails={stayDetails} />
              </div>
            )}

            {tab === "reviews" && (
              <ReviewsComp reviewList={reviewsList} updateList={() => {}} />
            )}

            {tab === "location" && <div></div>}

            <div className="">
              {hostMode ? (
                <button
                  className="stay-button"
                  onClick={() => editProperty(stayDetails?._id || "")}
                >
                  Edit Property
                </button>
              ) : (
                <button
                  className="stay-button"
                  onClick={() => bookStay(stayDetails?._id || "")}
                >
                  Rent Place
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StayPreviewPage;
