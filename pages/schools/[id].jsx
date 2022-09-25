import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import Navbar from '../../components/Navbar/Navbar'
import schoolPic from '../../public/assets/schoolPic.png'
import stars from '../../public/assets/etoiles_avis.png'
import School from '../../models/School'
import Transport from '../../models/Transport'
import User from '../../models/User'
import map from '../../public/assets/map2.png'
import Link from 'next/Link'

const Schools = ({school, drivers, transports}) => {

	const schoolParsed = JSON.parse(school)
	const driverParsed = JSON.parse(drivers)
	const transportParsed = JSON.parse(transports)

	return (
		<>
			<div key={schoolParsed._id}>
				<Navbar />
				<div className={styles.profileContainer}>
					<div className={styles.topPart}>
						<div className={styles.headerLeft}>
							<div className={styles.profilePic}>
								<Image src={schoolPic} width={150} height={100} className={styles.profilePic} />
							</div>
							<div className={styles.nameAge}>
								<h2>École : {schoolParsed.name}</h2>
								<h4>Adresse : {schoolParsed.address.street} </h4>
								<h4>Ville : {schoolParsed.address.city} </h4>
								<h4>Code postal : {schoolParsed.address.zip} </h4>
							</div>
						</div>
						<div className={styles.headerRight}>
							<div className={styles.mapPicContainer}>
								<Image src={map} width={300} height={230} className={styles.mapImg} />
							</div>
						</div>
					</div>
					<div key={driverParsed._id} className={styles.bottomPart}>
						<div className={styles.infoSection}>
							<h4>Joindre l'école : </h4>
							<p>par téléphone : {schoolParsed.phoneNumber}</p>
							<p>par mail : {schoolParsed.email}</p>
						</div>
						<div key={driverParsed._id} className={styles.stats}>
							<h4>Nom du directeur :  </h4> <span>{schoolParsed.directorContact.name}</span>
							<h4>Adresse mail : </h4> <span>{schoolParsed.directorContact.email}</span>
							<h4>Numéro de téléphone : </h4><span>{schoolParsed.directorContact.phoneNumber}</span>
						</div>
					</div>
					
					<div className={styles.drivers}>
						<h2>Découvrez les trajets vers cette école :</h2>	
							{driverParsed.map((driver) => (
									<div key={driver._id} className={styles.driversPart}>
									<Link href={`/profile/${driver._id}`}>
										<a className={styles.link}>
											<div className={styles.driverInfo}>
												<h4>{driver.firstName} {driver.lastName}</h4>
												<p>Email : {driver.email}</p>
												<h4>Nombre de trajets : {driver.travelDone} </h4>
											</div>
										</a>
									</Link>
									</div>
							))}	
					</div>			
				</div>
			</div>

			<footer className={styles.footer}>
                <div className={styles.footerTitle}>
                    <div  className={styles.footerTitle}>
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

export async function getServerSideProps(context) {
	const schoolId = context.query.id;

  await dbConnect()

  //await fetch('http://localhost:3000/api/user')

  const result = await School.findById(schoolId)
  const school = result.toObject()
  school._id = school._id.toString()

  const transports = await Promise.all(result.transportsId.map(async (transportId) => {
  	const transport = await Transport.findById(transportId)
  	return transport.toObject()
  }));

  const drivers = await Promise.all(transports.map(async (transport) => {
  	const driver = await User.findById(transport.driverId)
  	return driver.toObject()
  }));

  return { 
  	props: { 
  		school: JSON.stringify(school),
  		drivers: JSON.stringify(drivers),
  		transports: JSON.stringify(transports)
  		},
  	}
}

export default Schools
