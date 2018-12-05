const withOffline = require('next-offline')

module.exports = withOffline({
	webpack({ ...config }, { isServer }) {
		if (isServer) return config
		const f = config.entry
		const entry = async function entry(...p) {
			const r = await f.apply(this, p)
			const path = require('path')
			const resolve = path.resolve.bind(path, __dirname)
			const entry = async () => ({
				'service-worker': resolve('workers/service-worker.js'),
			})
			const output = { ...config.output, path: resolve('.dist'), filename: '[name].js' }
			await new Promise(s => require('rmdir')(resolve('.dist'), () => s()))
			const mk = await runCompiler({
				...config,
				target: 'webworker',
				name: 'webworker',
				entry,
				output,
				plugins: [],
				optimization: {
					minimizer: config.optimization.minimizer,
				},
				recordsPath: undefined,
			})
			console.log(mk)
			return r
		}
		return {
			...config,
			entry,
		}
		
	},
	exportPathMap: async function ({ ...pathMap }, { dev }) {
		delete pathMap['/index']
		if (dev) return pathMap
		return pathMap
	},
	generateSw: false,
	workboxOpts: {
		// globPatterns: ['static/**/*'],
		// globDirectory: '.',
		// runtimeCaching: [{ urlPattern: /^https?.*/, handler: 'networkFirst' }],
		swSrc: '.dist/service-worker.js',
	},
})

function runCompiler (config) {
	return new Promise(async (resolve, reject) => {
		const compiler = require('webpack')(config)
		compiler.run((err, stat) => {
			if (err) return reject(err)

			const multiStats = stat.stats ? stat : { stats: [stat] }
			const result = multiStats.stats.reduce((result, stat) => {
				if (stat.compilation.errors.length > 0) {
					result.errors.push(...stat.compilation.errors)
				}

				if (stat.compilation.warnings.length > 0) {
					result.warnings.push(...stat.compilation.warnings)
				}

				return result
			}, {errors: [], warnings: []})

			resolve(result)
		})
	})
}
