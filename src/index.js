import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Auth0Provider
    domain = 'oana-m.eu.auth0.com'
    clientId = 'pG34xmydkkLH0BPxGQcN36ijmE6JKV3J'
    redirectUri = 'http://localhost:3000/home'
  >
    <React.StrictMode>
      <ChakraProvider>
          <App /> 
      </ChakraProvider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
