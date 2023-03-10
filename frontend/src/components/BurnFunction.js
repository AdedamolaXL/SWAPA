import React, { useContext, useState, useEffect } from "react";
import { ContractContext } from "../contexts/ContractContext";
import { Button } from "@chakra-ui/button";

export default function BurnFunction(props) {
  const tokenId = props.tokenId;

  const {
    signedContract,
    signer,
    stateUserAddress,
    provider,
    contractAddress,
  } = useContext(ContractContext);

  const burn = async () => {
    let mintTx = await signedContract.burn(
      tokenId,
      {
        gasPrice: signer.getGasPrice(),
        gasLimit: 300000,
      }
    )
    .catch((e) => window.alert(e.message))
  };

  return(
    <Button colorScheme={'red'} onClick={burn}>
      Burn
    </Button>
  )
}