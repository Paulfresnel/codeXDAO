import { useEffect, useState } from "react";
import styles from "../styles/Swap.module.css"
import axios from 'axios'
import qs from 'qs'
import { useAccount } from "wagmi";


export default function CodeXSwap(){

    const [tokensList, setTokensList] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [currentTrade, setCurrentTrade] = useState({});
    const [currentSelectSide, setCurrentSelectSide] = useState('');
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [txErrorMessage, setTxErrorMessage] = useState('')
    const [quoteErrorMessage, setQuoteErrorMessage] = useState('')
    const {address} = useAccount()




    const openModal = (side)=>{
        document.getElementById("token_modal").style.display = 'block';
        setCurrentSelectSide(side);
    }  

    const closeModal = ()=>{
        document.getElementById("token_modal").style.display = 'none';
    }

    const selectToken =(e, token) =>{
        e.preventDefault();
        if (currentSelectSide === "from"){
            let updatedTx = currentTrade;
            updatedTx.from = token;
            setCurrentTrade(updatedTx)
            setFromToken(token.symbol)
        }
        else {
            let updatedTx = currentTrade;
            updatedTx.to = token;
            setCurrentTrade(updatedTx)
            setToToken(token.symbol)
        }
        closeModal();
        
        console.log("currentTrade:" , currentTrade);
    }

    const getPrice = async () =>{
        try{
        if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value){ 
            setTxErrorMessage('Make sure to select both tokens and input a value to transact')
            setTimeout(()=>{
                setTxErrorMessage('')
            },2500)
            return
        };
    // The amount is calculated from the smallest base unit of the token. We get this by multiplying the (from amount) x (10 to the power of the number of decimal places)
    let  amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);
    const params = {
    sellToken: currentTrade.from.address,
    buyToken: currentTrade.to.address,
    sellAmount: amount,
  }
  // Fetch the swap price.
    const response = await axios.get(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`);
    console.log("Price: ", response);
    // Use the returned values to populate the buy Amount and the estimated gas in the UI
    document.getElementById("to_amount").value = response.data.buyAmount / (10 ** currentTrade.to.decimals);
    document.getElementById("gas_estimate").innerHTML = response.data.estimatedGas;
} catch(err){
    console.log(err)
    let errorMessage = "The token you are trying to trade do not have enough liquidity to process the trade";
    setQuoteErrorMessage(errorMessage)
    setTimeout(()=>{
        setQuoteErrorMessage('')
    },2500)
  }
}

async  function  trySwap(){
  // The address, if any, of the most recently used account that the caller is permitted to access
    let accounts = await ethereum.request({ method: "eth_accounts" });
    let takerAddress = address;
  // Log the the most recently used address in our MetaMask wallet
    console.log("takerAddress: ", takerAddress);
    // Pass this as the account param into getQuote() we built out earlier. This will return a JSON object trade order. 
    const  swapQuoteJSON = await  getQuote(takerAddress);
    // index.js


// Setup the erc20abi in json format so we can interact with the approve method below
    const erc20abi= [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }]
    // Set up approval amount for the token we want to trade from
    const fromTokenAddress = currentTrade.from.address;
    
    // In order for us to interact with a ERC20 contract's method's, need to create a web3 object. This web3.eth.Contract object needs a erc20abi which we can get from any erc20 abi as well as the specific token address we are interested in interacting with, in this case, it's the fromTokenAddrss
// Read More: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#web3-eth-contract
    const  web3 = new  Web3(Web3.givenProvider);
    const ERC20TokenContract = new web3.eth.Contract(erc20abi, fromTokenAddress);
    console.log("setup ERC20TokenContract: ", ERC20TokenContract);

}

const getQuote = async () =>{
        try{
        if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value){ 
            setTxErrorMessage('Make sure to select both tokens and input a value to transact')
            setTimeout(()=>{
                setTxErrorMessage('')
            },2500)
            return
        };
    // The amount is calculated from the smallest base unit of the token. We get this by multiplying the (from amount) x (10 to the power of the number of decimal places)
    let  amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);
    const params = {
    sellToken: currentTrade.from.address,
    buyToken: currentTrade.to.address,
    sellAmount: amount,
    takerAddress: address
  };
  // Fetch the swap price.
    const response = await axios.get(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
    console.log("Quote: ", response);
    // Use the returned values to populate the buy Amount and the estimated gas in the UI
    document.getElementById("to_amount").value = response.data.buyAmount / (10 ** currentTrade.to.decimals);
    document.getElementById("gas_estimate").innerHTML = response.data.estimatedGas;
} catch(err){
    console.log(err)
    let errorMessage = "The token you are trying to trade do not have enough liquidity to process the trade";
    setQuoteErrorMessage(errorMessage)
    setTimeout(()=>{
        setQuoteErrorMessage('')
    },2500)
  }
}

    const filterTokens = (e) =>{
         e.preventDefault();
        const userInput = e.target.value.toLowerCase();

        const tokenSymbols = Array.from(document.querySelectorAll('.token-row > :nth-child(1)')).map(div => div.innerText.toLowerCase());

        const matchingIndices = tokenSymbols.reduce((acc, symbol, i) => {
        if (symbol.includes(userInput)) {
            acc.push(i);
        }
        return acc;
        }, []);

        const tokensList = document.getElementsByClassName('token-row');
        for (let i = 0; i < tokensList.length; i++) {
        if (matchingIndices.includes(i)) {
            tokensList[i].style.display = 'block';
        } else {
            tokensList[i].style.display = 'none';
        }
    }
}

    useEffect(()=>{
        async function fetch  (){
            setIsloading(true);
            let response = await axios.get('https://tokens.coingecko.com/uniswap/all.json');
            let tokensList = response.data.tokens;
            setTokensList(tokensList);
            setIsloading(false)
        }
        fetch();
    },[]) 

    return(
        <div  className={styles.white_font}>
            <div className="container">
        <div className="row">
            <div className="col col-md-6 offset-md-3" id="window">
                <h4 className={styles.h4}><strong className={styles.colored}>CodeX</strong> Swap</h4>
                <div id="form">
                    <div className={styles.swapbox}>
                        <div onClick={()=>openModal("from")} className={styles.swapbox_select_padding} id="from_token_select">
                            {currentTrade.from ? <div className={styles.flex}><img className={styles.image} src={currentTrade.from.logoURI}/> <p>{currentTrade.from.symbol}</p></div> : "SELECT A TOKEN"}
                        </div>
                        <div className={styles.swapbox_select}>
                            <input onChange={()=>getPrice()} className="number form-control" placeholder="amount" id="from_amount"/>
                        </div>
                    </div>
                    <div className={styles.swapbox}>
                        <div onClick={()=>openModal("to")} className={styles.swapbox_select_padding} id="to_token_select">
                             {currentTrade.to ? <div className={styles.flex}><img className={styles.image} src={currentTrade.to.logoURI}/> <p>{currentTrade.to.symbol}</p></div> : "SELECT A TOKEN"}
                        </div>
                         <div className={styles.swapbox_select}>
                            <input className="number form-control" placeholder="amount" id="to_amount"/>
                        </div>
                    </div>  
                    <div className={styles.gas_estimate_label}><p>Estimated Gas: <span className={styles.colored_min} id="gas_estimate"></span> wei</p></div>
                    {address ? <button disabled className={styles.swap_btn} id="swap_button">Swap</button> : <p className={styles.connect}>Connect your Wallet to be able to swap</p>  }
                    {txErrorMessage.length>5 && <p className={styles.tx_error}>{txErrorMessage}</p> }    
                    {quoteErrorMessage.length>5 && <p className={styles.tx_error}>{quoteErrorMessage}</p> }            
        
                </div>
            </div>
        </div>
    </div>
     {/* Our modals will be declared here */}
    <div class="modal" id="token_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <input onChange={(e)=>filterTokens(e)} className={styles.alligned} type="search" placeholder="Search for a token.."></input>
            <button id="modal_close" type="button" class="close" data-dismiss="modal" onClick={()=>closeModal()} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={styles.modal_body}>
            <div id="tokens_list">
                {(!isLoading && tokensList.length >5) && tokensList.map((token)=>{
                     return <div className="token-row" key={token.address}><div onClick={(e)=>selectToken(e,token)} value={token.symbol} className={styles.token_row} >
                      <img 
                        className={styles.token_list_img}
                        src={token.logoURI}
                        alt={`${token.symbol} Logo`}
                      />
                      <span className={styles.token_list_text}>{token.symbol}</span>
                    </div>
                    </div>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
    )


};

