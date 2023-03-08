import React, { Fragment, useState } from "react";
import "./MintPage.css";
import { Container, Flex } from "@chakra-ui/layout";

import MintFormDetails from "../MintFormDetails";
import TradingViewComponent from "../TradingViewComponent";
import backgroundLines from "../../assets/hero-bg.png";

export default function MintPageView(props) {
  const [isOpen, setIsOpen] = useState(false);
  const firstFieldRef = React.useRef(null);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Container maxW="1400px" maxH="1000px" p={0} boxShadow="base" backgroundColor="#232945" borderRadius="10">
            
            <Flex py={[0, 10, 20]}
      direction={{ base: 'column-reverse', md: 'row' }} p ={10}>
            <MintFormDetails /> 
      {/* <TradingViewComponent firstFieldRef={firstFieldRef}/>  */}
     </Flex>
      <img src ={backgroundLines} maxW="1400px"/> 
     
    </Container>
  );
}
