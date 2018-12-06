const path = require('path')
const resolve = path.resolve.bind(path, __dirname)
const rmdir = path =>
	new Promise(s => require('rmdir')(resolve(`../${path}`), () => s()))

const main = async () => {
	await Promise.all([
		rmdir('node_modules/.cache'),
		rmdir('.next'),
		rmdir('out'),
	])
}

main()
