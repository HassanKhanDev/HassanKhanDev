import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--fallback-b1,oklch(var(--b1)))',
                color: 'var(--fallback-bc,oklch(var(--bc)))',
              },
              success: {
                iconTheme: {
                  primary: 'var(--fallback-su,oklch(var(--su)))',
                  secondary: 'var(--fallback-suc,oklch(var(--suc)))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--fallback-er,oklch(var(--er)))',
                  secondary: 'var(--fallback-erc,oklch(var(--erc)))',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);