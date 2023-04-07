const { resolve } = require('path');

module.exports = {
    SOURCE_DIRECTORY : resolve(__dirname, '../src/index.js'),
    BUILD_DIRECTORY : resolve(__dirname, '../dist'),
    indexHTML : resolve(__dirname, '../src/index.html'),
    SOURCE_DIRECTORY_ASSETS: resolve(__dirname, '../src/assets'),
    BUILD_DIRECTORY_ASSETS: resolve(__dirname, '../dist/assets'),
}
