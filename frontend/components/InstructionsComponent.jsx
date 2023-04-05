import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		
		<div className={styles.container}>
		
			<header className={styles.header_container}>
				<h1 className={styles.ta_center}>
					CodeX<span>DAO</span> 
				</h1>
				<div className={styles.b_bottom}/>
				<div className={styles.m_bottom}/>
				<p>
					Your <strong className={styles.highlighted}>portal</strong> to the crypto World.
					<div className={styles.m_bottom}/>
					
				</p>
			</header>

			<div className={styles.buttons_container}>
			<Link href="/profile">
			<div className={styles.button}>
			<p> Access <strong  className={styles.colored}>Profile</strong></p> 
			</div>
			</Link>
				
				<Link href='/about'>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>About CodeX<strong className={styles.colored}>DAO</strong></p>
					</div>
				</Link>
				
				<Link href="/swap">
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p><strong  className={styles.colored}>CodeX</strong>  Swap</p>
					</div>
				</Link>
				<Link href="/docs">
					<div className={styles.button}>
						<p>Consult <strong  className={styles.colored}>Documentation</strong></p>
					</div>
				</Link>
			</div>
			<div className={styles.footer}>
				
				<div className={styles.icons_container}>
					{/* <div>
						<a
							href={undefined}
							target={"_blank"}
						>
							Join our Discord
						</a>
					</div>
					<div>
						<a
							href={undefined}
							target={"_blank"}
						>
							Follow us on Twitter
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
}
