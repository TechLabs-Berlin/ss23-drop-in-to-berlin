import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RestProvider } from './context/RestaurantContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RestProvider>
    <App />
  </RestProvider>
);
