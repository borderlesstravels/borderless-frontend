import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import AuthEnforcerModal from "../components/block-components/auth-enforcer-modal/auth-enforcer-modal";
import { userLogin, userLogout } from "../services/actions-reducers/user-data";
import { iStoreState } from "../services/constants/interfaces/store-schemas";
// import { routeConstants } from '../services/constants/route-constants';
import { sendRequest } from "../services/utils/request";

const ProctedRoutes = () => {
  // const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const verified = useSelector(
    (state: iStoreState) => state?.user?.email_verified
  );
  const userType: "user" | "host" = useSelector(
    (state: iStoreState) => state?.user?.userMode || "user"
  );
  const [overlayMode, setOverlayMode] = useState<0 | 1 | 2>(2);
  const [initialized, setInitialized] = useState(false);

  const updateOverlayMode = (count: 0 | 1 | 2) => {
    setOverlayMode(count);
  };

  const getUser = () => {
    sendRequest(
      {
        url: userType === "user" ? "user-profile/user" : "host-profile/profile",
        method: "GET",
      },
      (res: any) => {
        dispatch(userLogin({ ...res.data, userMode: userType }));
      },
      (err: any) => {
        //   toast.error(err?.error || err?.message || 'Request Failed');
        if (err?.error === "No cookie found") {
          dispatch(userLogout());
        }
      }
    );
  };

  useEffect(() => {
    setTimeout(() => setInitialized(true), 600);
    getUser();
  }, [verified]);

  useEffect(() => {
    if (initialized) {
      if (verified) {
        updateOverlayMode(1);
      } else {
        updateOverlayMode(0);
      }
    } else {
      if (verified) {
        updateOverlayMode(2);
      } else {
        updateOverlayMode(0);
      }
    }
  }, [verified]);

  return (
    // verified ? <Outlet/> : <Navigate to={`/${routeConstants.login}`} />
    <>
      <Outlet />
      {overlayMode !== 2 && (
        <AuthEnforcerModal
          overlayMode={overlayMode}
          updateOverlayMode={updateOverlayMode}
          init
        />
      )}
    </>
  );
};

export default ProctedRoutes;
