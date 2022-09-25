import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import Navbar from '../../components/Navbar/Navbar'
import profile from '../../public/assets/profile_1.jpg'
import stars from '../../public/assets/etoiles_avis.png'
import User from '../../models/User'
import SendMessage from '../../components/SendMessage/SendMessage'

const Profile = ({user}) => {

const userParsed = JSON.parse(user)

	return (
		<>
			<div key={userParsed._id}>
				<Navbar />
				<div className={styles.profileContainer}>
					<div className={styles.topPart}>
						<div className={styles.headerLeft}>
							<div className={styles.profilePic}>
								<Image src={profile} width={90} height={90} className={styles.profilePic} />
							</div>
							<div className={styles.nameAge}>
								<h2>{userParsed.firstName} {userParsed.lastName}</h2>
								<h5>Email : {userParsed.email} </h5>
								<h5>Numéro de téléphone : {userParsed.phoneNumber} </h5>
							</div>
						</div>
						<div className={styles.headerRight}>
							<h4>Mon école : {userParsed.school}</h4>
							<h4>Ma ville : {userParsed.address.city}</h4>
							<h4>Nombre de places : 2</h4>
						</div>
					</div>
					<div className={styles.bottomPart}>
						<div className={styles.infoSection}>
							<h3>En apprendre plus sur {userParsed.firstName} {userParsed.lastName}</h3>
							<p>Passionné de covoiturage, n'hésitez pas à me contacter pour emmener vos enfants à l'école. Mes filles Lana et Tess seront contentes d'être accompagnées !</p>
						</div>
						<div className={styles.stats}>
							<h4>Date d'inscription : </h4> <span>{userParsed.createdAt}</span>
							<h4>Nombre de trajets effectués : </h4> <span>{userParsed.travelDone}</span>
							<div className={styles.note}><h4>Avis : </h4><Image src={stars} /></div>
						</div>
					</div>
				</div>
				<SendMessage />
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const userId = context.query.id;

	console.log(userId)
  await dbConnect()

  //await fetch('http://localhost:3000/api/user')

  const result = await User.findById(userId)
  const user = result.toObject()
  user._id = user._id.toString()

  return { 
  	props: { 
  		user: JSON.stringify(user)
  		},
  	}
}

export default Profile