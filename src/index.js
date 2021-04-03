import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";


ReactDOM.render(
    <React.StrictMode>
        <Router>
          <Auth0ProviderWithHistory>
            <ChakraProvider>
              <App /> 
            </ChakraProvider>
          </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
