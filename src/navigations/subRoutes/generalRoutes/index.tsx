import { lazy } from "react";
import { Path } from "../../routes";
import { RouteObject } from "react-router-dom";
import SuspenseFallback from "../../../components/block-components/suspense-fallback";

const HomePage = lazy(() => import("../../../pages/user/home/home"));
const AboutPage = lazy(() => import("../../../pages/user/about/about"));
const LoginPage = lazy(() => import("../../../pages/user/login/login"));
const SignupPage = lazy(() => import("../../../pages/user/signup/signup"));
const VerifyEmail = lazy(
  () => import("../../../pages/user/verify-email/verify-email")
);
const RequestPassword = lazy(
  () => import("../../../pages/user/retrieve-password/retrieve-password")
);
const UpdatePassword = lazy(
  () => import("../../../pages/user/reset-password/reset-password")
);
const SkyflexPayPage = lazy(
  () => import("../../../pages/user/skyflex-pay/skyflex-pay")
);
const SkyRewardsPage = lazy(
  () => import("../../../pages/user/sky-rewards/sky-rewards")
);
const TravelOnCreditPage = lazy(
  () => import("../../../pages/user/travel-on-credit/travel-on-credit")
);
const TermsPage = lazy(() => import("../../../pages/user/terms/terms"));
const PrivacyPolicyPage = lazy(
  () => import("../../../pages/user/privacy-policy/privacy-policy")
);
const CareersPage = lazy(() => import("../../../pages/user/careers/careers"));
const ContactPage = lazy(() => import("../../../pages/user/contact/contact"));

const FlightSearchPage = lazy(
  () => import("../../../pages/user/flights/flight-search/flight-search")
);
const FlightPreviewPage = lazy(
  () => import("../../../pages/user/flights/flight-preview/flight-preview")
);
const FlightBookingPage = lazy(
  () =>
    import(
      "../../../pages/user/flights/flight-booking-page/flight-booking-page"
    )
);

const StaySearchPage = lazy(
  () => import("../../../pages/user/stays/stay-search/stay-search")
);
const StayPreviewPage = lazy(
  () => import("../../../pages/user/stays/stay-preview/stay-preview")
);

const BookRidesPage = lazy(
  () => import("../../../pages/user/book-rides/book-rides")
);
const RewardsPage = lazy(() => import("../../../pages/user/rewards/rewards"));
const DealsPage = lazy(() => import("../../../pages/user/deals/deals"));
const ExplorePage = lazy(() => import("../../../pages/user/explore/explore"));
const TravelInfoPage = lazy(
  () => import("../../../pages/user/travel-info/travel-info")
);
const FlightTrackerPage = lazy(
  () => import("../../../pages/user/flight-tracker/flight-tracker")
);

const FeedbackPage = lazy(
  () => import("../../../pages/user/feedback/feedback")
);
const PartnersPage = lazy(
  () => import("../../../pages/user/partners/partners")
);
const HelpPage = lazy(() => import("../../../pages/user/help/help"));
const FaqPage = lazy(() => import("../../../pages/user/faq/faq"));

const routesData = [
  { path: Path.home, index: true, component: <HomePage /> },
  { path: Path.about, component: <AboutPage /> },
  { path: Path.login, component: <LoginPage /> },
  { path: Path.signup, component: <SignupPage /> },
  { path: Path.verfyEmail, component: <VerifyEmail /> },
  { path: Path.requestPassword, component: <RequestPassword /> },
  { path: Path.updatePassword, component: <UpdatePassword /> },
  { path: `${Path.offers}/${Path.skyflexPay}`, component: <SkyflexPayPage /> },
  { path: `${Path.offers}/${Path.skyRewards}`, component: <SkyRewardsPage /> },
  {
    path: `${Path.offers}/${Path.travelOnCredit}`,
    component: <TravelOnCreditPage />,
  },
  { path: Path.terms, component: <TermsPage /> },
  { path: Path.privacyPolicy, component: <PrivacyPolicyPage /> },
  { path: Path.careers, component: <CareersPage /> },
  { path: Path.contact, component: <ContactPage /> },
  { path: Path.flights, component: <FlightSearchPage /> },
  { path: `${Path.flightPreview}/:id`, component: <FlightPreviewPage /> },
  { path: `${Path.flightBooking}/:id`, component: <FlightBookingPage /> },
  { path: Path.stays, component: <StaySearchPage /> },
  { path: `${Path.stayPreview}/:id`, component: <StayPreviewPage /> },
  { path: Path.bookRides, component: <BookRidesPage /> },
  { path: Path.rewards, component: <RewardsPage /> },
  { path: Path.deals, component: <DealsPage /> },
  { path: Path.explore, component: <ExplorePage /> },
  { path: Path.travelInfo, component: <TravelInfoPage /> },
  { path: Path.flightTracker, component: <FlightTrackerPage /> },
  { path: Path.feedBack, component: <FeedbackPage /> },
  { path: Path.partners, component: <PartnersPage /> },
  { path: Path.help, component: <HelpPage /> },
  { path: Path.faq, component: <FaqPage /> },
];

const generalRoutesChildren: RouteObject[] = routesData.map(
  ({ component, path, index }) => ({
    path,
    index,
    element: <SuspenseFallback component={component} path={path} />,
  })
);

export const generalRoutes = [...generalRoutesChildren];
