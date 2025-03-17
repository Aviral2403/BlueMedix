import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import './assets/styles/App.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <Toaster position="top-right" />
    </UserProvider>
  </React.StrictMode>
);