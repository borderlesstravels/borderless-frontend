import { lazy } from "react";
import { Path } from "../../routes";
import { RouteObject } from "react-router-dom";
import SuspenseFallback from "../../../components/block-components/suspense-fallback";
import ProtectedLayout from "../../../layout/protected-layout";

const ProfilePage = lazy(
  () => import("../../../pages/user/profile/profile-tab")
);
const FlightDetailsPage = lazy(
  () => import("../../../pages/user/flights/flight-search/flight-search")
);
const StayBookingPage = lazy(
  () => import("../../../pages/user/stays/stay-booking-page/stay-booking-page")
);
const StayDetailsPage = lazy(
  () => import("../../../pages/user/stays/stay-search/stay-search")
);
const MyBookingsPage = lazy(
  () => import("../../../pages/user/my-bookings/my-bookings")
);
const FlightTicketPage = lazy(
  () =>
    import(
      "../../../pages/user/my-bookings/flights/flight-tickets/flight-tickets"
    )
);
const StayBookingSingleRecordPage = lazy(
  () =>
    import(
      "../../../pages/user/my-bookings/stays/stay-booking-single-record/stay-booking-single-record"
    )
);
const HostBookingsPage = lazy(
  () => import("../../../pages/host/host-profile/bookings-sect/bookings-sect")
);
const StayPreviewPage = lazy(
  () => import("../../../pages/user/stays/stay-preview/stay-preview")
);

// Host Routes
const AddShortletPage = lazy(
  () => import("../../../pages/host/add-stay/add-shortlet/add-shortlet")
);

const routesData = [
  { path: `${Path.flightDetails}/:id`, component: <FlightDetailsPage /> },
  { path: `${Path.stayDetails}/:id`, component: <StayDetailsPage /> },
  { path: `${Path.stayBooking}/:id`, component: <StayBookingPage /> },
  { path: Path.profile, component: <ProfilePage /> },
  { path: `${Path.profile}/:tab`, component: <ProfilePage /> },
  { path: Path.myBookings, component: <MyBookingsPage /> },
  { path: `${Path.myBookings}/:mode`, component: <MyBookingsPage /> },
  { path: `${Path.flightTicket}/:reference`, component: <FlightTicketPage /> },
  {
    path: `${Path.stayBookingDetail}/:id`,
    component: <StayBookingSingleRecordPage />,
  },
  { path: Path.addShortlet, component: <AddShortletPage /> },
  { path: `${Path.editShortlet}/:id`, component: <AddShortletPage /> },
  { path: `${Path.viewShortlet}/:id`, component: <StayPreviewPage hostMode /> },
  { path: Path.hostBookings, component: <HostBookingsPage /> },
];

const protectedRoutesChildren: RouteObject[] = routesData.map(
  ({ component, path }) => ({
    path,
    element: <SuspenseFallback component={component} path={path} />,
  })
);

export const protectedRoutes = [
  { element: <ProtectedLayout />, children: protectedRoutesChildren },
];
