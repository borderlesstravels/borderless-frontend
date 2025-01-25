import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FlightPreviwImg } from "../../../../assets/images";
import MicroLoader from "../../../../components/block-components/micro-loader/micro-loader";
import { Path } from "../../../../navigations/routes";
import { sendRequest } from "../../../../services/utils/request";
import { swalDanger, swalSuccess } from "../../../../services/utils/swal-utils";
import "./profile-sect.scss";

interface iNotification {
  createdAt: string;
  description: string;
  owner: string;
  title: string;
  type: string;
  _id: string;
  booking_id: string;
  open?: boolean;
  frozen?: boolean;
}

function ProfileSect({ notifications }: { notifications: iNotification[] }) {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState<iNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleDrawControll = (index: number) => {
    const newNotification = [...notificationList];
    newNotification[index].open
      ? (newNotification[index].open = false)
      : (newNotification[index].open = true);
    setNotificationList(newNotification);
  };

  const toggleFreeze = (index: number) => {
    const newNotification = [...notificationList];
    newNotification[index].frozen
      ? (newNotification[index].frozen = false)
      : (newNotification[index].frozen = true);
    setNotificationList(newNotification);
  };

  const rejectBooking = (item: any, index: number) => {
    console.log("Matasa");
    swalDanger
      .fire({
        title: "Reject Booking",
        text: `Are you sure you wish to reject the request to book your shortlet?`,
        icon: "error",
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          toggleFreeze(index);
          sendRequest(
            {
              url: "host-profile/decline-booking/" + item._id,
              method: "PUT",
            },
            (res: any) => {
              toast.success(res.message || "successful");
            },
            (err: any) => {
              toggleFreeze(index);
              toast.error(
                err?.message ||
                  err?.error ||
                  "Unable to decline, please check your network and retry"
              );
            }
          );
        }
      });
  };

  const confirmBooking = (item: any, index: number) => {
    swalSuccess
      .fire({
        title: "Confirm Booking",
        text: `Please verify the property is available and in the condition described before confirming this request to book your shortlet?`,
        icon: "success",
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          toggleFreeze(index);
          sendRequest(
            {
              url: "host-profile/confirm-booking/" + item._id,
              method: "PUT",
            },
            (res: any) => {
              toast.success(res.message || "successful");
            },
            (err: any) => {
              toggleFreeze(index);
              toast.error(
                err?.message ||
                  err?.error ||
                  "Unable to confirm, please check your network and retry"
              );
            }
          );
        }
      });
  };

  const viewBookingDetail = (id: string) => {
    navigate(`/${Path.stayBookingDetail}/${id}`);
  };

  useEffect(() => {
    setNotificationList(notifications);
  }, [notifications]);

  return (
    <div className="profile-sect">
      <div className="holder">
        <div className="row">
          <div className="col-md-7">
            <div className="imh graph-holder">
              <img src={FlightPreviwImg} alt="" />
            </div>
          </div>
          <div className="col-md-5">
            <div className="notifications-holder">
              <h5>Notifications ({notificationList.length})</h5>
              <div className="notification-list">
                {notificationList.map((item, index) => (
                  <div
                    className={
                      "notification-card" + (item.frozen ? " frozen" : "")
                    }
                    key={index}
                  >
                    {item.type === "booking" && (
                      <p className="label">Shortlet Booking Request</p>
                    )}
                    <h6>{item.title}</h6>
                    <div className="drawer-holder">
                      <div className={"drawer" + (item.open ? " opened" : "")}>
                        <p className="mb-0">{item.description}</p>
                      </div>
                      <div
                        className="draw-control"
                        onClick={() => toggleDrawControll(index)}
                      >
                        <FontAwesomeIcon
                          icon={item.open ? "chevron-up" : "chevron-down"}
                        />
                      </div>
                    </div>
                    <div className="action-holder">
                      <div className="action">
                        <button
                          className="reject-button"
                          onClick={() => rejectBooking(item, index)}
                        >
                          Reject
                        </button>
                        <span></span>
                        <button
                          className="confirm-button"
                          onClick={() => confirmBooking(item, index)}
                        >
                          Confirm
                        </button>
                        <span></span>
                        <button
                          className="view-button wb-view"
                          onClick={() => viewBookingDetail(item.booking_id)}
                        >
                          View
                        </button>
                      </div>
                      <button
                        className="view-button mb-view"
                        onClick={() => viewBookingDetail(item.booking_id)}
                      >
                        View Property
                      </button>
                    </div>
                    {item.frozen && (
                      <div className="processing-tag">
                        <MicroLoader />
                      </div>
                    )}
                  </div>
                ))}
                {notificationList.length === 0 && (
                  <div className="py-4 text-center">
                    <p className="mb-0">
                      There are no notifications as at present
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSect;
