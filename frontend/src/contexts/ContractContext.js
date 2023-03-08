import React, { createContext, useState } from "react";
import { abi } from "../abi/abi";
import { ethers } from "ethers";


export const ContractContext = createContext();

export function ContractProvider(props) {
  const contractAddress = "0xf0251FF9314B3C27E5024015210EBC2D4D269c63";
  const ABI = abi.abi;
  // const ALCHEMY = "https://eth-goerli.g.alchemy.com/v2/IXEH3jodwjRQO03VTpMgtcami_DLHhQx"

  // const [walletConnected, setWalletConnected] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isOwner, setIsOwner] = useState(false);
  // const web3ModalRef = useRef();

  // const connectWallet = async () => {
  //   try {
  //    // Get the provider from web3Modal, which prompts the user to connect their wallet
  //    await getProviderOrSigner();
  //    setWalletConnected(true);
  //   } catch (err) {
  //   console.error(err)
  //   }
  // };

  // // Returns a Provider Or Signer object representing the Ethereum RPC with or without the signing capabilities of metamask attached
  // // * A provider is needed to interact with the blockchain - reading transactions, reading balances, reading state
  // // * A signer is a special type of provider used in case of  a write transaction needs to be made to the blockchain, which involves the connected account 
  // // needing to make a digital signature to authorize the transaction being setInterval. Metamask exposes a Signer API to allow your website to request signatures from the user using signer functions.
  // // * needSigner - true if you need a signer, false otherwise

  // const getProviderOrSigner = async (needSigner = false) => {
  //   const provider = awaut web3ModalRef.current.connect();
  //   const web3Provider = new getProviderOrSigner.Web3Provider(provider);

  //   const { chainId } = await web3Provider.getNetwork();
  //   if (chainId !== 5) {
  //     window.alert("Change the network to Goerli");
  //     throw new Error("Change network to Goerli");
  //   }

  //   if (needSigner) {
  //     const signer = web3Provider.getSigner();
  //     return signer;
  //   }
  //   return web3Provider;
  // };

  // useEffect(() => {
  //   if (!walletConnected) {
  //     web3ModalRef.current = new web3Modal({
  //       network: "goerli",
  //       providerOptions: {},
  //       disableInjectedProvider: false,
  //     });
  //     connectWallet();
  //   }
  // })
  
  
  
  const [stateUserAddress, setstateUserAddress] = useState('')
  const [signedContract, setSignedContract] = useState()
  const [signer, setSigner] = useState()
  const [provider, setProvider] = useState()

  let userAddress;

  const connect = async () => {
    let provider
    if(window.ethereum != null){
    provider = new ethers.providers.Web3Provider(window.ethereum, "any")}
      // provider = new ethers.providers.JsonRPCProvider();
    await provider.send("eth_requestAccounts", [0]);
    let signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, ABI, provider);

    let signedContract = contract.connect(signer);

    userAddress = await signer.getAddress();

    setSignedContract(signedContract)

    setstateUserAddress(userAddress)

    setProvider(provider)

    setSigner(signer)

    console.log('success', signer, signedContract, userAddress, provider)

  };

  return(
    <ContractContext.Provider value={{connect, stateUserAddress, signedContract, signer, provider,contractAddress}}>
      {props.children}
    </ContractContext.Provider>
  );
}
