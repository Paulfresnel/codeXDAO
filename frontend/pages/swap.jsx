import { useEffect, useState } from "react";
import styles from "../styles/Swap.module.css"
import axios from 'axios'
import qs from 'qs'


export default function CodeXSwap(){

    const [tokensList, setTokensList] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [currentTrade, setCurrentTrade] = useState({});
    const [currentSelectSide, setCurrentSelectSide] = useState('');
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [txErrorMessage, setTxErrorMessage] = useState('')
    const [quoteErrorMessage, setQuoteErrorMessage] = useState('')




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
                    <button disabled className="btn btn-large btn-primary btn-block" id="swap_button">Swap</button>   
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

