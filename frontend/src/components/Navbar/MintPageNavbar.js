import React,{useState, useContext} from 'react';
import {Flex, Spacer, Button, Heading, Image
} from "@chakra-ui/react";
import { ContractContext } from "../../contexts/ContractContext";
import { MintFormContext } from '../../contexts/MintFormContext';
import AnimatedText from 'react-animated-text-content';
import { Link } from 'react-router-dom';


// import logo5 from '../../assets/logo5.svg';
// import wallet from "../../assets/wallet.png";

export default function MintPageNavbar(props) {
  const {mintForm} = useContext(MintFormContext);
  const {connect, stateUserAddress, signedContract, signer} = useContext(ContractContext);
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Flex bg="brand.100"  p={5}>
      <Flex  margin={2} spacing={10}>
        {/* { <Image src={logo5} /> } */}
        <Heading  size="m" >SWAPA </Heading> 
      </Flex>

      <Spacer />
  
      <Flex bg="brand.100" p={3} fontWeight="700" color="blue">
        <AnimatedText 
          type='words' font-size={40} interval={0.04} duration={0.8} animation={{y: '100px', ease: 'ease',
        }}> 
        Swap your liquid tokens for NFTs and protect your portfolio
        </AnimatedText>
      </Flex>

      <Spacer />

      {stateUserAddress? 
      <Button margin={2} colorScheme="teal" boxShadow="base"  _hover={{background: "white", color: "teal",
      }}>
      Connected! 
      {/* { <img src={wallet} style={{width:"25px",hieght:"25px",paddingLeft:"2px"}}/> } */}
      </Button> 
      : 
      <Button onClick={connect} margin={2} colorScheme="teal"  boxShadow="base" _hover={{background: "white", color: "teal",
      }}>
      Connect With Wallet
      {/* { <img src={wallet} style={{width:"25px",hieght:"25px",paddingLeft:"2px"}}/> } */}
      </Button>}
      <Button colorScheme="teal" margin={2} boxShadow="base" _hover={{background: "white", color: "teal",
      }}> 
      
      <Link to="/positions">Positions</Link> </Button>
      <Button colorScheme="teal" margin={2} boxShadow="base" _hover={{background: "white", color: "teal",
      }}> 

      <Link to="/app">Mint</Link> </Button>
  
    </Flex>
  )
}
