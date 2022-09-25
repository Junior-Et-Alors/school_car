import React from 'react'
import styles from './index.module.scss'
import Navbar from '../../components/Navbar/Navbar'

const FAQ = () => {
	return (
		<>
		<Navbar />
		<div className={styles.faqContainer}>
			<h1>FAQ</h1>

			<div>
				<h3>Pourquoi c'est trop bien School Car ?</h3>
				<p>Parce que c'est vraiment de la bombe.</p>
			</div>

			<div>
				<h3>Pourquoi votre nefant ne se fera pas kidnapper ?</h3>
				<p>Parce qu'on a les num et les mails.</p>
			</div>

			<div>
				<h3>Comment ça se passe légalement ?</h3>
				<p>Tu signes la décharge et on verra qui embarque tes gosses.</p>
			</div>
		</div>
		</>
	)
}

export default FAQ