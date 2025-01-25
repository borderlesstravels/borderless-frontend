import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./services/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import {
  iconList,
  fontAwesomeLibrary as library,
} from "./libraries/fontawesome";

import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/general.scss";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigations/router";

library.add(...iconList);

const App = () => {
  AOS.init({
    duration: 1200,
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <RouterProvider router={router} />;
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
