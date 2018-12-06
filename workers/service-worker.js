/* global workbox */

self.__precacheManifest = []
	.concat(self.__precacheManifest || [])
	.map(({ url, ...rest }) => ({
		...rest,
		url: url.replace(/\\/giu, '/'),
	}))
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
	/^https?.*/,
	workbox.strategies.networkFirst(),
	'GET',
)

self.addEventListener(
	'notificationclick',
	event => {
		console.log('close')
		event.notification.close()
		// clients.openWindow('/')
	},
	false,
)

const sleep = ms => new Promise(r => setTimeout(r, ms))
const main = async () => {
	console.log('hoge')

	const send = async num => {
		try {
			const { answer } = await fetch('https://yesno.wtf/api').then(r =>
				r.json(),
			)
			self.registration.showNotification(`title ${num}`, {
				body: `${answer} ${num}`,
				// icon: 'data:,',
				tag: 'push-notification-tag',
			})
		} catch (x) {
			self.registration.showNotification(`error ${x.name} ${num}`, {
				body: `${x.message}`,
				// icon: 'data:,',
				tag: 'push-notification-tag',
			})
		}
	}

	await sleep(1000)

	//yesno.wtf/api

	await send(1)

	await sleep(1000 * 60 * 5)

	await send(2)

	await sleep(1000 * 60 * 5)

	await send(3)
}

main()
