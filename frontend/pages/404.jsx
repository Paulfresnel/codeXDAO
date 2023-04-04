import Link from "next/link"
import styles from "../styles/ErrorPage.module.css"

export default function ErrorPage(){

    return(
        <div className={styles.centered}>
            <h1 className={styles.colored}>Oops, 404 Error!</h1>
            <p className={styles.white_font}> The Page you are trying to access is not available yet or
            does not exist.</p>
            <div className={styles.spacer}/>
            <div className={styles.alligned}>
            <Link href="/">
            <button  className={styles.button}>Go Back to Homepage</button>
            </Link>
            </div>
        </div>
    )
}