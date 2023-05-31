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
						<p>About CodeX<strong className={styles.colored}>DAO</strong></p>
					</div>
				</Link>
				
				<Link target="_blank" href="/swap">
					<div className={styles.button}>
						<p>CodeX  <strong  className={styles.colored}>Swap</strong>
						<br/>
						<em>(under construction)</em></p>
					</div>
				</Link>
				<a target="_blank" href="https://codex-dao-blockexplorer.vercel.app/">
					<div className={styles.button}>
						<p>CodeX <strong  className={styles.colored}>Block Explorer</strong>
						<br/>
						</p>
					</div>
				</a>
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
