import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalContextProvider } from './contexts/ModalContextProvider';
import './index.css';
import "../src/cssStyles/navBar.css"
import "../src/cssStyles/profile.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <ModalContextProvider>
      <App />
    </ModalContextProvider>
    
  </React.StrictMode>
);


