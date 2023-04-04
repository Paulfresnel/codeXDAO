import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					web3<span>DAO</span>
				</h1>
				<p>
					Your portal to the best crypto News
				</p>
			</header>

			<div className={styles.buttons_container}>
			<div className={styles.button}>
			<Link href="/profile"><p> Access profile page</p> </Link>
			</div>
				<a
					target={"_blank"}
					href={"https://createweb3dapp.alchemy.com/#components"}
				>
				
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Add Components</p>
					</div>
				</a>
				<a
					target={"_blank"}
					href={"https://createweb3dapp.alchemy.com/#templates"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Explore Templates</p>
					</div>
				</a>
				<a
					target={"_blank"}
					href={"https://docs.alchemy.com/docs/create-web3-dapp"}
				>
					<div className={styles.button}>
						<img
							src="https://static.alchemyapi.io/images/cw3d/Icon%20Large/file-eye-01-l.svg"
							width={"20px"}
							height={"20px"}
						/>
						<p>Visit Docs</p>
					</div>
				</a>
			</div>
			<div className={styles.footer}>
				
				<div className={styles.icons_container}>
					<div>
						<a
							href="https://github.com/alchemyplatform/create-web3-dapp"
							target={"_blank"}
						>
							Leave a star on Github
						</a>
					</div>
					<div>
						<a
							href="https://twitter.com/AlchemyPlatform"
							target={"_blank"}
						>
							Follow us on Twitter
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
