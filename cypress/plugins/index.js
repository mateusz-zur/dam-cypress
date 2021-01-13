const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
const fs = require('fs');
const path = require('path');
const request = require('request');
require('dotenv').config()

const downloadDirectory = path.join(__dirname, '..', 'downloads')
module.exports = (on, config) => {

  getCompareSnapshotsPlugin(on, config);
  on('task', {
    clearDownloads () {
      console.log('clearing folder %s', downloadDirectory)

      fs.rmdirSync(downloadDirectory, { recursive: true })

      return null
    },
    readFile (path) {
      return fs.readFileSync(path)
    },
  sendBinary({placeholderID, filePath, assetName}) {
    const appUrl = process.env.APP_URL
    request.post(`${appUrl}/VS/import/placeholder/${placeholderID}/container/raw?tag=auto_check&filename=${assetName}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/octet-stream',
      },
      body: fs.readFileSync(filePath),
      auth: {
        'username': process.env.ADMIN_LOGIN,
        'password': process.env.ADMIN_PASSWORD,
      },
    },
    function () {})
    return true
  },
})
}
