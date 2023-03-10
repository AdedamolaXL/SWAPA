import React, { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { MintFormContext } from "../contexts/MintFormContext";
import { Text, Heading } from "@chakra-ui/layout";
import * as dotenv from 'dotenv'


export default function DexPrice(props) {
  const { tokenSymbols, mintForm } = useContext(MintFormContext);

  const [holdTokenPrice, setholdTokenPrice] = useState();
  const [collateralTokenPrice, setcollateralTokenPrice] = useState();
  console.log(props.inputToken)

  useEffect(() => { 
      axios
        .get(
          `https://api.dev.dex.guru/v1/chain/1/tokens/${props.inputToken}/market?api-key=${process.env.DEXGURU_API}`
        )
        .then((res) => {
          console.log(res.data.price_usd);
          setholdTokenPrice(res.data.price_usd.toFixed(2));
          return res;
        });
    
  }, [mintForm.holdToken]);

  return (
    <Fragment>
      <Text >DEX PRICE: $ {holdTokenPrice}</Text>
    </Fragment>
  );
}
