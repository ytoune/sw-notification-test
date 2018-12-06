import React from 'react'
import Head from 'next/head'

const onClick = () => {
	navigator.serviceWorker.getRegistration().then(registration => {
		console.log('send from browser')

		fetch('https://yesno.wtf/api')
			.then(r => r.json())
			.then(({ answer }) => {
				registration.showNotification('title 0', {
					body: `${answer} 0`,
					// icon: 'data:,',
					tag: 'push-notification-tag',
				})
			})
	})
}

const Home = () => (
	<>
		<Head>
			<title>hoge</title>
			<link
				rel="manifest"
				href="/sw-notification-test/static/manifest/manifest.json"
			/>
		</Head>
		<div>home</div>
		<div>
			<button onClick={onClick}>push</button>
		</div>
	</>
)

export default Home
