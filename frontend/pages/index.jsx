import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import NftGallery from "../components/nftGallery";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
    const [userAddress, setUserAddress] = useState('')
  const {address} = useAccount()
  console.log(address)
  return (
    <div>
      <main className={styles.main}>
        <InstructionsComponent></InstructionsComponent>
      </main>
    </div>
  );
}
