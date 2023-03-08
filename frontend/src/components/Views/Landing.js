import React from 'react';
import { Image } from '@chakra-ui/image';
import { Container } from "@chakra-ui/layout";
import landing from "../../assets/landing.jpeg";
import { Button } from '@chakra-ui/button';
import viewDemoButton from "../../assets/viewDemoButton.svg";

export default function Landing() {

  return(
    <Container maxW='2100px' maxH='500px'>
      <Image maxW='1550px' maxH='900px' left={'550px'} src={landing}/> 
     
      <Button marginBottom={6} bottom={'270px'} left={'610px'}> 
        <a href='/app'>    
      
           <Image src={viewDemoButton}></Image>  
           
        </a>  
      </Button>        
    </Container>
  )
           
}