import React, { useEffect, useState, Suspense, Fragment } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { MintFormProvider } from "./contexts/MintFormContext";
import { ContractProvider } from "./contexts/ContractContext";
import Landing from "./components/Views/Landing"
import MintPageNavbar from "./components/Navbar/MintPageNavbar";
import MintPageView from "./components/Views/MintPageView";
// import PositionsView from "./components/Views/PositionsView";
import {
  Container,Flex
} from "@chakra-ui/react";

function App() {
  return (
    <div style={{backgroundColor:"#10152C",color:"white"}}>

    <ContractProvider>
      <MintFormProvider>
   
      <div>
      <MintPageNavbar/>
      </div>
      <Routes>
      <Route index element={<Landing />} />
      <Route path='/app' element={<MintPageView />}/>
      {/* <Route exact path='/positions' component={PositionsView}/> */}
      </Routes>
    
      </MintFormProvider>
    </ContractProvider>
    
    </div>
  );
}

export default App;
