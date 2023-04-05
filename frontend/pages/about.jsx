import styles from "../styles/AboutPage.module.css"
import Link from "next/link"

export default function AboutPage(){
    return(
        <div className={styles.white_font}>
            <Link className={styles.link_allign} href={"/"}>
        		<button className={styles.homepage_btn}>Go back to homepage</button>
            </Link>
            <h1 className={styles.title}>About CodeX <strong className={styles.colored}>DAO</strong></h1>
        <div className={styles.div_block}/>
        <div className={styles.flex_container}>
            <div className={styles.flex_children}>
                <h2 className={styles.spaced_plus}> Your <strong className={styles.colored}>Blockchain Experts</strong>  </h2>
                <p className={styles.shortened}>CodeX DAO is a safe and audited crosschain DAO project that aims to create a transparent 
                and trustworthy platform for collective wellness. The project will feature a decentralized tokenomics 
                distribution system that will incentivize liquidity providers and stakers to participate in the network.
                </p>
            </div>
            <img className={styles.fixed_w} src="/piechart.png"/>
        </div>
        <div className={styles.flex_container}>
            <img className={styles.fixed_w} src="/tokenomics.png"/>

            <div className={styles.flex_children}>
                <h2 className={styles.spaced_plus_extra}> Enhanced <strong className={styles.colored}> Tokenomics</strong>  </h2>
                <p className={styles.shortened_reverse}>
                The CodeX DAO token will be an ERC20 token that will have governance rights within the platform.
                The total supply of the token will be 21 million, and the founder team will receive a reward of 1 million
                tokens. The founder team's allocation will be publicly announced, and it will not influence any 
                decisions made by the DAO.
                </p>
            </div>
        </div>

        <div className={styles.flex_container}>
            <div className={styles.flex_children}>
                <h2 className={styles.spaced_plus}> <strong className={styles.colored}>Token Distribution </strong>Plan  </h2>
                <p className={styles.shortened}>The majority of the tokens will be minted through liquidity pool mining.
                Staking with NFTs and the token will be the second method of token minting. The rewards for liquidity 
                providers will be reduced gradually over time. This approach will create a fair and decentralized tokenomics 
                system similar to the distribution of Bitcoin. 
                </p>
            </div>
            <img className={styles.fixed_w} src="/ethereum-mainpage.png"/>
        </div>
        <br/>
        <div className={styles.div_block}/>
        <h2 className={styles.ta_allign}>More on our <strong className={styles.colored}>FAQ</strong></h2>

        <div className={styles.div_block_short}/>
        <div className={styles.faq}>
            <details className={styles.card}>
                <summary>Will the DAO be able to influence the token distribution ?</summary>
                <p className={styles.spaced}>The DAO governance will be able to modify this token distribution 
                once the relevant function is enabled.</p>
            </details>
            <details className={styles.card}>
                <summary >What is the token Distribution Plan ?</summary>
                <p className={styles.spaced}>The distribution of our DAO governance token will be as stated below:</p>
                <ul className={styles.list}>
                    <li>Liquidity pool mining: 50% (10M)</li>
                    <li>Token staking and NFTs: 30% (6M)</li>
                    <li>Marketing and community: 5% (1M)</li>
                   <li>Airdrops: 5% (1M)</li>
                   <li>Development: 5% (1M)</li>
                   <li>Partnerships: 3% (600K)</li>
                   <li>Vault: 2% (400K)</li>
                </ul>
            </details>
            </div>
        </div>
    )
}
