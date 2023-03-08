import React, { useEffect, useState, useContext, Fragment } from "react";
import {
  VStack,
  Text,
  SimpleGrid,
  GridItem,
  Select,
  Flex,
  NumberInput,
  NumberInputField,
  Container,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { ContractContext } from "../contexts/ContractContext";
import { MintFormContext } from "../contexts/MintFormContext";
import useTokenList from "../hook/useTokenList";
import MintFunction from "./MintFunction";
import DexPrice from "./DexPrice";


const MintFormDetails = (props) => {
  // const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"

  const tokenList = useTokenList(
    "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
  );

  console.log(tokenList)

  // const {connect, stateUserAddress, signedContract} = useContext(ContractContext);
  const {
    mintForm,
    changeHoldToken,
    changeCollateralToken,
    changeAmount,
    changeStopLoss,
    changeTakeProfit,
  } = useContext(MintFormContext);

  const [holdcoinImage, setholdcoinImage] = useState("")
  const [collateralcoinImage, setcollateralcoinImage] = useState("")

  useEffect(()=> {
 
    if(true){
    const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/fantom/contract/${mintForm.holdToken}`)
    .then(res => setholdcoinImage(res.data.image.thumb))
    }
  }, [mintForm.holdToken])

  useEffect(()=>{
    if(true){
      const grabholdCoinImage = axios.get(`https://api.coingecko.com/api/v3/coins/fantom/contract/${mintForm.collateralToken}`)
      .then(res => setcollateralcoinImage(res.data.image.thumb))
    }
  }, [mintForm.collateralToken])

  return (
    <Fragment>
      
    <Container  p={0} boxShadow="base" backgroundColor="gray.800" borderRadius="10">
    <VStack w="full" h="half" p={10} spacing={10} alignItems="flex-start" > 
      <DexPrice inputToken={mintForm.holdToken}/>

      <Text  fontSize="xl">Set Your Deposit Token</Text>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">

    
        <GridItem colSpan={2}>
          <Flex spacing={30}>

          <GridItem colSpan={1}>
              <Image src={holdcoinImage} p ={2}/>
            </GridItem>
            <GridItem colSpan={1}>
              <Select className={'selectText'} variant='outline'   onChange={changeHoldToken}>

  

                {tokenList.map((token, id) => (
                  <option className={'selectText'} value={[token.address,token.symbol]} key={id}>
                    {token.symbol}
                  </option>
                ))}
              </Select>
            </GridItem>

            <NumberInput
              onChange={changeAmount}
              maxW="100px"
              paddingLeft='1rem'
              mr="2rem"
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.amount} />
            </NumberInput>
            <MintFunction />
          </Flex>
        </GridItem>

        <Text  fontSize="xl">Set Your Recieve Token</Text>

        <GridItem colSpan={2}>
          <Flex spacing={30}>
          <GridItem colSpan={1}>
          <Image src={collateralcoinImage} p={2}/>
            </GridItem>

            
            

            <GridItem colSpan={1}>
              <Select  className={'selectText'} onChange={changeCollateralToken}>




                {tokenList.map((token, id) => (
                  <option className={'selectText'} value={[token.address,token.symbol]} key={id}>
                    {token.symbol}
                  </option>
                ))}
           
              </Select>

              </GridItem>

              

            <Text p={2}>Max</Text>

            <NumberInput
              onChange={changeTakeProfit}
              maxW="100px"
              
              defaultValue={0}
              min={0}
            >
              <NumberInputField value={mintForm.takeProfit} />
            </NumberInput>

            <Text  fontSize="1xl" p ={2}>Min</Text>

<NumberInput
onChange={changeStopLoss}
maxW="100px"
defaultValue={0}
min={0}
>
<NumberInputField value={mintForm.stopLoss} />
</NumberInput>




            
          </Flex>
        </GridItem>

      </SimpleGrid>
      <Flex>

      </Flex>
    </VStack>
    </Container>
    </Fragment>
  );
};

export default MintFormDetails;
