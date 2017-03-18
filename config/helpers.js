const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const chalk = require('chalk')

// Helper functions
const ROOT = path.resolve(__dirname, '..')

function hasProcessFlag (flag) {
  return process.argv.join('').indexOf(flag) > -1
}

function isWebpackDevServer () {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}

function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

function loadEnvironmentVariables (config) {
  // Here, we use dotenv to load our env vars in the .env, into process.env
  if (fs.existsSync('.env')) {
    dotenv.load()
  }
  console.log(chalk.yellow(`Variáveis de ambiente carregadas para env: ${chalk.bold(config.env)}`))
}

exports.hasProcessFlag = hasProcessFlag
exports.isWebpackDevServer = isWebpackDevServer
exports.root = root
exports.loadEnvironmentVariables = loadEnvironmentVariables
