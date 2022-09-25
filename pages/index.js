import Navbar from "../components/Navbar/Navbar";
import React, { useState } from 'react'
import styles from "./home-page.module.scss"
import Image from 'next/image'
import Link from 'next/Link'
import dbConnect from '../lib/dbConnect'
import School from '../models/School'
import bg from "../public/assets/HeroBannerImage.png"
import homePic1 from "../public/assets/homePic1.png"
import homePic2 from "../public/assets/homePic2.png"
import homePic3 from "../public/assets/homePic3.png"
import homePic4 from "../public/assets/homePic4.png"
import homePic5 from "../public/assets/homePic5.png"
import homePic6 from "../public/assets/homePic6.png"


export default function HomePage({schools}) {

    const schoolParsed = JSON.parse(schools)
    const schoolName = schoolParsed.map((school) => {
        return school.name
    })

    return (
        <>
            <Navbar />
            <Image objectFit={"cover"} layout={"fill"} src={bg} alt="enfant dans une voiture" className={styles.bg}/>

            <section className={styles.firstSection}>
                <div className={styles.title}>
                    <h1>Faites transporter<br/> votre enfant  en toute confiance</h1>
                </div>

            </section>

            <section>
                <div className={styles.schoolSelector}>
                    <label for="school-select">Rechercher maintenant mon école : </label>
                        <div>
                            <select name="school-select">
                                {schoolParsed.map((school) => (  
                                        <option key={school._id} id={school._id} >{school.name}, {school.address.city}</option>
                                ))}
                            </select>
                                <button type="submit">Lancer la recherche</button>
                        </div>
                        
                </div>
            </section>

            <section className={styles.secondSection}>
                <div>
                    <h2>Comment marche <span>School Car ?</span></h2>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>Recherchez l'école de vos enfants</h3>
                         <Image src={homePic1} width={450} height={300} />
                    </div>
                    <div className={styles.card}>
                        <h3>Inscrivez-vous sur School Car</h3>
                        <Image src={homePic2} width={450} height={300} />
                    </div>
                    <div className={styles.card}>
                        <h3>Regardez les profils de parents se rendant à la même école</h3>
                        <Image src={homePic3} width={450} height={300} />
                    </div>
                    <div className={styles.card}>
                        <h3>Contactez-les pour établir un lien de confiance</h3>
                        <Image src={homePic4} width={450} height={300} />
                    </div>
                    <div className={styles.card}>
                        <h3>Signez la décharge téléchargeable depuis votre espace</h3>
                        <Image src={homePic5} width={450} height={300} />
                    </div>
                    <div className={styles.card}>
                        <h3>Vos enfants peuvent faire du covoiturage en toute confiance !</h3>
                        <Image src={homePic6} width={450} height={300} />
                    </div>

                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerTitle}>
                    <div >
                        <h3>School Car, premier site de covoiturage scolaire en France</h3>
                    </div>
                    <div className={styles.footerLinks}>
                        <li>Accueil</li>
                        <li>Profil</li>
                        <li>FAQ</li>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <small>©School Car. Tous droits réservés</small>
                </div>
            </footer>
        </>
    )
}

export async function getServerSideProps() {

  await dbConnect()

  const result = await School.find({})
  const schools = result.map((school) => {
    return school.toObject()
  })

  schools.forEach((school) => {
    school._id = school._id.toString()
    })

  return { 
    props: { 
        schools: JSON.stringify(schools)
        },
    }
}
