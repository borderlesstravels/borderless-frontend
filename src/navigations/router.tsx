import { createBrowserRouter } from "react-router-dom";
import { generalRoutes } from "./subRoutes/generalRoutes";
import UserModule from "../layout/app-layout/app-layout";
import { protectedRoutes } from "./subRoutes/protectedRoutes";
import Home from "../pages/user/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserModule />,
    // errorElement: <Error />,
    children: [
      ...generalRoutes,
      ...protectedRoutes,
      { path: "*", element: <Home /> },
    ],
  },
]);
