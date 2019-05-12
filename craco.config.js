const { ESLINT_MODES } = require('@craco/craco')
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      'global': path.resolve(__dirname, 'src/global'),
      'initializers': path.resolve(__dirname, 'src/initializers'),
      'screens': path.resolve(__dirname, 'src/screens'),
      'components': path.resolve(__dirname, 'src/common/components'),
      'domain': path.resolve(__dirname, 'src/domain'),
      'hocs': path.resolve(__dirname, 'src/common/hocs'),
      'lib': path.resolve(__dirname, 'src/lib'),
      'images': path.resolve(__dirname, 'src/images')
    }
  },
  eslint: {
    mode: ESLINT_MODES.file
  }
}
