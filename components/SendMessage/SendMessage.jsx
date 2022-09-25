import React from 'react'
import styles from './SendMessage.module.scss'

const SendMessage = () => {
	return (
		<>
		<div className={styles.btnContainer}>
			<button type="button">Envoyer un message</button>
		</div>
		</>
	)
}

export default SendMessage