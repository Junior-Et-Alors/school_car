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
                    <Link href="/profile/63303c74b48021ea5e08420c">
                        <a className={styles.links}>Profil</a>
                    </Link>
                    <Link href="/faq">
                        <a className={styles.links}>FAQ</a>
                    </Link>
                    <Link href="/schools/632f72d376681fc4f14037f8">
                        <a className={styles.links}>École</a>
                    </Link>
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
