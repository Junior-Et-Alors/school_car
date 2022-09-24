import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'

const Profile = () => {
	return (

		<div className={styles.profileContainer}>

			<div className={styles.topPart}>
		
				<div className={styles.headerLeft}>
					<div className={styles.profilePic}>
						<Image />
					</div>
						<h2>Nom & prénom</h2>
						<h4>Âge </h4>
				</div>

				<div className={styles.headerRight}>
					<h4>Ecole :</h4>
					<h4>Ville :</h4>
					<h4>Nombre de places :</h4>
				</div>

			</div>

			<div className={styles.bottomPart}>

				<div className={styles.infoSection}>
					<h3>En apprendre plus sur Nom Prénom</h3>
					<p>Lorem Ipsum ça fait plaisir</p>
				</div>

				<div className={styles.stats}>
					<h4>Date d'inscription : 15 septembre 2019</h4>
					<h4>Nombre de trajets effectués : 17</h4>
					<p>Avis : </p>
				</div>

			</div>
			
		</div>
	)
}

export default Profile