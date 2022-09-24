import Navbar from "../components/Navbar/Navbar";
import styles from "./home-page.module.scss"
import Image from 'next/image'
import bg from "../public/assets/HeroBannerImage.png"

export default function HomePage() {
    return (
        <>
            <Navbar />
            <Image objectFit={"cover"} layout={"fill"} src={bg} alt="enfant dans une voiture" className={styles.bg}/>

            <section className={styles.firstSection}>
                <div className={styles.title}>
                    <h1>Faites transporter<br/> votre enfant  en toute confiance</h1>
                </div>

            </section>

            <section className={styles.secondSection}>
                <div>
                    <h2>Comment marche <span>School Car ?</span> </h2>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h1>card 1</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>card 2</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>card 3</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>card 4</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>card 5</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>card 6</h1>
                    </div>

                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerTitle}>
                    <div >
                        <h3>Footer</h3>
                    </div>
                    <div className={styles.footerLinks}>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                        <li>Link 4</li>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <small>©School Car. Tous droits réservés</small>
                </div>
            </footer>
        </>
    )
}
