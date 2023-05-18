const path = require('path')
const cwd = process.cwd()

const isDev = () => process.env.NODE_ENV == 'development'

const createWebpackAliases = (aliases) => Object.entries(aliases)
  .reduce((r, [ k, v ]) => ({ ...r, [k]: path.join(cwd, v) }), {})

module.exports = {
  isDev,
  createWebpackAliases,
}
