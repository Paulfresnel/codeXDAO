import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href={'/'}>
				<img className={styles.codex_logo} src="/codexDAO-logo(1).png"></img>
			</Link>
			<div className={styles.reduced_l}>
			<ConnectButton></ConnectButton>
			</div>
		</nav>
	);
}
