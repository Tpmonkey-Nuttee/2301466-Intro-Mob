import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1b2d42',
              color: '#f0ece4',
              border: '1px solid rgba(201,168,76,0.2)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#4caf87', secondary: '#1b2d42' } },
            error:   { iconTheme: { primary: '#e05c5c', secondary: '#1b2d42' } },
          }}
        />
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);