const fs = require('fs')
const { execSync } = require('child_process')

module.exports = function(context) {
  console.log('\x1b[33m%s\x1b[0m', 'Updating `www` files.')

  console.log(execSync('npm run clear').toString())
  console.log(execSync('npm run build').toString())
  console.log(execSync('npm run move').toString())

  console.log(execSync('mkdir www/audio').toString())

  console.log(execSync('cp halo_on_fire.mp3 www/audio/halo_on_fire.mp3'))
}
