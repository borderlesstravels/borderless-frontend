import React from 'react';
import BaseRoute from './routes/_base-route';
import AOS from 'aos';
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { iconList, fontAwesomeLibrary as library } from './libraries/fontawesome';
import './assets/styles/general.scss';
import './App.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './services/store';
import { PersistGate } from 'redux-persist/integration/react';

library.add(...iconList)

function App() {
  AOS.init({
    duration: 1200,
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <BaseRoute></BaseRoute>
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
