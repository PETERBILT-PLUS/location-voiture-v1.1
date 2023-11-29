import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import myStore, { persistor } from "./Configuration/store.js";
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './Configuration/api.js';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);