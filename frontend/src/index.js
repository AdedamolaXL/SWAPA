import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import "./index.css";
import reportWebVitals from './reportWebVitals';

import { MoralisProvider } from "react-moralis";

import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react";



const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    colors: {
      brand: {
        100: "#c19161f",
        200: "#aa7cf2",
        300: "#23e8a0",
        400: "#33a4f3", 
        500: "#0fb5dc",
        600: "#d8d8d8",
      },
    },
      global: {
        body: {
          bg: "#c19161f",
          color: "white",
        },
      },
      components: {
        Button: {
          baseStyle: {
            fontWeight: "bold",
            colorSchem: "#23e8a0"
          },
        },
      },

  },
  config
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    {/* <MoralisProvider
      appId= "001"
      serverUrl= "http://localhost:1337/server"
      > */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </MoralisProvider> */}
    </ChakraProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
