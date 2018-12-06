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

const sleep = ms => new Promise(r => setTimeout(r, ms))
const main = async () => {
	await console.log('hoge')
	// self.addEventListener('push', function (event) {
	//   console.log('Received a push message', event);
	//   var title = "プッシュ通知です！";
	//   var body = "プッシュ通知はこのようにして送られるのです";

	// });

	await sleep(1000 * 60 * 10)
	event.waitUntil(
		self.registration.showNotification('titletitle', {
			body: 'bodybody',
			// icon: 'http://free-images.gatag.net/images/201108090000.jpg',
			tag: 'push-notification-tag',
		}),
	)
	self.addEventListener(
		'notificationclick',
		function(event) {
			event.notification.close()
			// clients.openWindow('/')
		},
		false,
	)
}

main()
