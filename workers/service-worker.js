/* global workbox */

self.__precacheManifest = []
	.concat(self.__precacheManifest || [])
	.map(({ url, ...rest }) => ({
		...rest,
		url: url.replace(/\\/giu, '/')
	}))
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')

const main = async () => {

	await console.log('hoge')

}

main()
