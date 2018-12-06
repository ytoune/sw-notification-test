const promisify = fn => (...p) =>
	new Promise((res, rej) => fn(...p, (e, r) => (e ? rej(e) : res(r))))

const ghpages = require('gh-pages')

const path = require('path')
const resolve = p => path.resolve(__dirname, `../${p}`)

const fs = require('fs')

const writeFile = promisify(fs.writeFile.bind(fs))
const publish = promisify(ghpages.publish.bind(ghpages))

const main = async () => {
	try {
		await writeFile(resolve('out/.nojekyll'), '', { encoding: 'utf8' })
	} catch (x) {
		console.error(x)
	}
	try {
		await publish(resolve('out'), { dotfiles: true })
	} catch (x) {
		console.error(x)
	}
	console.log('done')
}

main().catch(x => console.error(x))
