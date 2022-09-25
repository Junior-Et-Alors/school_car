import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import Navbar from '../../components/Navbar/Navbar'
import schoolPic from '../../public/assets/schoolPic.png'
import stars from '../../public/assets/etoiles_avis.png'
import School from '../../models/School'
import map from '../../public/assets/map1.png'

const Schools = ({school}) => {

const schoolParsed = JSON.parse(school)

console.log(schoolParsed)

	return (
		<>
			<div key={schoolParsed._id}>
				<Navbar />
				<div className={styles.profileContainer}>
					<div className={styles.topPart}>
						<div className={styles.headerLeft}>
							<div className={styles.profilePic}>
								<Image src={schoolPic} width={90} height={90} className={styles.profilePic} />
							</div>
							<div className={styles.nameAge}>
								<h2>{schoolParsed.name}</h2>
								<h5>Adresse : {schoolParsed.address} </h5>
								<h5>Numéro de téléphone : {schoolParsed.phoneNumber} </h5>
							</div>
						</div>
						<div className={styles.headerRight}>
							<Image src={map} width={100} height={100} className={styles.profilePic} />
							<h4>Mon école : {schoolParsed.school}</h4>
							<h4>Ma ville : </h4>
							<h4>Nombre de places : 2</h4>
						</div>
					</div>
					<div className={styles.bottomPart}>
						<div className={styles.infoSection}>
							<h3>Nom du directeur : {schoolParsed.directorContact.name}</h3>
							<p>Adresse mail : {schoolParsed.directorContact.email}</p>
						</div>
						<div className={styles.stats}>
							<h4>Date d'inscription : </h4> <span>{schoolParsed.createdAt}</span>
							<h4>Nombre de trajets effectués : </h4> <span>{schoolParsed.travelDone}</span>
							<div className={styles.note}><h4>Avis : </h4><Image src={stars} /></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const schoolId = context.query.id;

  await dbConnect()

  //await fetch('http://localhost:3000/api/user')

  const result = await School.findById(schoolId)
  console.log(result)
  const school = result.toObject()
  school._id = school._id.toString()

  return { 
  	props: { 
  		school: JSON.stringify(school)
  		},
  	}
}

export default Schools
