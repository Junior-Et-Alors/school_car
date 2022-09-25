import Image from 'next/image'
import logo from "../../public/assets/School_Car-logo.png"
import styles from './Navbar.module.scss'
import Link from "next/link";
import Login from "../../pages/login/index"
export default function Navbar() {

    return(
        <>
            <div className={styles.navbarContainer}>
                <div className="logo">
                    <Image width={100} height={50} className="logo1" src={logo} alt="logo" />
                </div>
                <div className={styles.linksContainer}>
                    <Link href="/">
                        <a className={styles.links}>Accueil</a>
                    </Link>

                        <a className={styles.links}>Profil</a>
                        <a className={styles.links}>FAQ</a>
                </div>

                <div className={styles.buttonContainer}>
                    <Link href="/login" >
                        <button className={styles.loginButton}>Inscription</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
