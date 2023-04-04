import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import styles from "../styles/profile.module.css"
import NftGallery from '../components/nftGallery'
import {MutatingDots} from 'react-loader-spinner'
import TokensBalancePanel from '../components/tokensBalanceDisplay'

export default function Profile(){

  const { address, isConnected, isDisconnected } = useAccount();
    const [display, setDisplay] = useState('none')
    const [userChain, setUserChain] = useState('ETH_MAINNET')

    const setNFTs = ()=>{
        if (display !== 'NFTs'){
            setDisplay('NFTs')
        }
    }

    const setTokens = ()=>{
        if (display !== 'Tokens'){
            setDisplay('Tokens')
        }
    }

    const setChain = (e) =>{
        setUserChain(e.target.value)
    }


    return(
        <div className={styles.white_font}>
            <h1><span className={styles.highlighted}>Profile</span> Page</h1>
            <h2 className={styles.small_length}>{address}</h2>
            <br/>
            <div className={styles.margin_auto}>
            <select onChange={(e)=>setChain(e)}>
                <option value='ETH_MAINNET'>ETH Mainnet</option>
                <option value="MATIC_MAINNET">Matic Mainnet</option>
            </select>
                <button onClick={()=>setNFTs()} value="NFTs">NFTs in Wallet</button>
                <button onClick={()=>setTokens()} value="Tokens">Token Balances</button>
            </div>
            <div>
                {display === 'NFTs' ? <div>
        {userChain.includes("ETH") && <NftGallery collectionAddress={address} chain="ETH_MAINNET"/>}
        {userChain.includes("MATIC") && <NftGallery collectionAddress={address} chain="MATIC_MAINNET"/>}


                </div>
                : 
                <div>
        {userChain.includes("ETH") && <div className={styles.margin_auto}><TokensBalancePanel collectionAddress={address} chain="ETH_MAINNET"/></div>}
        {userChain.includes("MATIC") && <div className={styles.margin_auto}><TokensBalancePanel collectionAddress={address} chain="MATIC_MAINNET"/></div>}        
                </div>
                }
            </div>
        </div>
    )

}

