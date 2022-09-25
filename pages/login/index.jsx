import styles from "./index.module.scss"
import Image from 'next/image'
import bgLogin from "../../public/assets/bg-login.jpg"
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react"

export default function Login(){

    const [stateOnglets, setStateOnglets] = useState(2)

    const goRegister = () => {
        setStateOnglets(2)
    }

    const goLogin = () => {
        setStateOnglets(1)
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.modalContainer}>
                    {stateOnglets === 1 ?
                    <div className={styles.modal}>
                        <h2>Connexion</h2>
                        <form action="">
                            <div>
                                <input className={styles.fullWidth} required type="text" placeholder="Email :"/>
                            </div>
                            <div>
                                <input className={styles.fullWidth} required type="password" placeholder="Mot de passe :"/>
                            </div>
                            <div>
                                <button className={styles.buttonDark}>Se connecter</button>
                            </div>
                        </form>

                        <div>
                            <p>Pas de compte ? Inscrivez vous <button onClick={goRegister}>ici</button></p>
                        </div>
                    </div>
                    :
                    <div className={styles.modal}>
                        <h2>S'inscrire</h2>
                        <form action="">
                            <div className={styles.formNames}>
                                <input required type="text" placeholder="Nom"/>
                                <input required type="text" placeholder="Prénom"/>
                            </div>
                            <div>
                                <input required className={styles.fullWidth} id="test" type="number" maxLength="10" minLength="10" placeholder="Numéro de téléphone"/>
                            </div>
                            <div>
                                <input required className={styles.fullWidth} type="email" name="" id="" placeholder="Email"/>
                            </div>
                            <div>
                                <input required className={styles.fullWidth} type="password" minLength="6" placeholder="Mot de passe"/>
                                <input required className={styles.fullWidth} type="password" minLength="6" placeholder="Mot de passe"/>
                            </div>
                            <div>
                                <button type='submit' className={styles.buttonDark}>S'inscrire</button>
                            </div>

                        </form>
                        <div>
                            <p>Déjà un compte ? Connectez vous <button onClick={goLogin}>ici</button></p>
                        </div>
                    </div>
                    }
                </div>

                <div className={styles.image}>
                </div>
            </div>
        </>
    )
}
