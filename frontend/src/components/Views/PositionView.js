import React, { useEffect, useState, useContext } from "react";
import { ContractContext } from "../../contexts/ContractContext";
import { Button } from "@chakra-ui/button";
import { utils } from "ethers";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td, 
  Container
} from "@chakra-ui/react";
import BurnFunction from "../BurnFunction";
import DexPrice from "../DexPrice";
import MoralisGetNFT from "../MoralisGetNFT";
import useTokenList from "../../hook/useTokenList";



export default function PositionsView() {
  const {
    signedContract,
    signer,
    stateUserAddress,
    provider,
    contractAddress
  } = useContext(ContractContext);

  const tokenList = useTokenList(
    "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
  );
  // const tokenList = goerliList

  const [tokenIds, setTokenIds] = useState([]);
  const [positionData, setPositionData] = useState([]);

  const showPositions = async () => {
    try {
      if (stateUserAddress) {
        const getOwnedPositions = async () => {
          const positions = await signedContract.getOwnedPositions();

          await (async () => {
            let positionIds = [];   

            for (let i = 0; i < positions.length; i++) {
                  positionIds.push(positions[i]);
            }

            setTokenIds(positionIds);

            let res = [];

            for (let i = 0; i < tokenIds.length; i++) {
              let position = await signedContract.getPosition(tokenIds[i]);
              console.log(position);

                let token = tokenList.filter(token => token.address == position.fromToken.toString());
                let recieveToken = tokenList.filter(token => token.address == position.toToken.toString());
                console.log(recieveToken);

                if (
                  position.fromToken.toString() !== "0x0000000000000000000000000000000000000000"
                ) {
                  res.push({
                    id: position.id.hex.toString(),
                    inputToken: token[0].name,
                    recieveToken: recieveToken[0].name,
                    amount: utils.formatEther(position.amount.toString(), {
                      commify: true,
                      pad: true,
                    }),
                    maxPrice: position.takeProfit.toString(),
                    minPrice: position.stopLoss.toString(),
                    inputTokenAddress: position.fromToken.toString()
                  });
                }
            }
            
            setPositionData(res);
          
          })();
        
        };
        
        getOwnedPositions();
      }
    }
    catch(e){
      window.alert('error', e)
   }
};

  useEffect(() => {
    showPositions();
  }, [stateUserAddress]);
  
  return (
    <Container maxW="1400px" h="900px" p={0} boxShadow="base" backgroundColor="#232945" borderRadius="10">
      <Button onClick={showPositions} colorScheme="teal" margin={2} boxShadow="base" _hover={{
    background: "white",
    color: "teal",
  }} > Show Positions </Button>
  
      <Container maxW="1400px" maxH="1000px" color="white" boxShadow="base" backgroundColor="#232945" borderRadius="10" >
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Token ID</Th>
            <Th>Input Token</Th>
            <Th>Recieve Token</Th>
            <Th isNumeric>DEX Price</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric> Max Price </Th>
            <Th isNumeric> Min Price </Th>
          </Tr>
        </Thead>
        <Tbody>
          {positionData.map((position) => (
            <Tr>
              <Td>{position.id}</Td>
              <Td>{position.inputToken}</Td>
              <Td>{position.recieveToken}</Td>
              <Td><DexPrice inputToken={position.inputTokenAddress} /> </Td>
              <Td isNumeric>{position.amount}</Td>
              <Td isNumeric>{position.maxPrice}</Td>
              <Td isNumeric>{position.minPrice}</Td>
              <Td isNumeric>
                <BurnFunction tokenId={position.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Container>
      <MoralisGetNFT/>
    </Container>
  );
}