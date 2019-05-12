const context = require.context('..', true, /\/reducers.js$/)

export default context.keys().map(context)
