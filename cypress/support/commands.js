import 'cypress-file-upload';
import 'cypress-xpath'
import { VIDEO_ASSET_INITIAL_METADATA } from '../fixtures/metadata';
const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();

Cypress.Commands.add('createSupportingFilesCollection', () => {
  const body = {
    "metadata": {
      "timespan": [{
        "end": "+INF",
        "start": "-INF",
        "field": [{
          "name": "supporting_files_collection",
          "value": [{
            "value": "true"
          }]
        }]
      }]
    }
  }
  cy.request({
      method: 'POST',
      url: `${Cypress.env('APP_URL')}/VS/collection`,
      body: body,
      headers: {
        "accept": "application/json",
      },
      auth: {
        'username': Cypress.env('ADMIN_LOGIN'),
        'password': Cypress.env('ADMIN_PASSWORD'),
    }
  }).then((resp) => {
      return resp.body.id.split('COLLECTION-')[1]
  })
})

Cypress.Commands.add('createAssetPlaceholder', (token) => {
    cy.createSupportingFilesCollection().then((collectionID) => {
      const supportingFileCollectionId = `COLLECTION-${collectionID}`
      const newTimespan = {
          "field": [
              {
                  "name": "supporting_files_collection_id",
                  "value": [
                      {
                          "value": supportingFileCollectionId
                      }
                  ]
              },
              {
                  "name": "supporting_files_number",
                  "value": [
                      {
                          "value": 0
                      }
                  ]
              },
          ],
          "start": "-INF",
          "end": "+INF"
      }
      let body = JSON.parse(JSON.stringify(VIDEO_ASSET_INITIAL_METADATA))
      body["timespan"].push(newTimespan)
      cy.request({
          method: 'POST',
          url: `${Cypress.env('APP_URL')}/VS/import/placeholder?container=1`,
          body: body,
          headers: {
            "accept": "application/json",
          },
          auth: {
            'username': Cypress.env('ADMIN_LOGIN'),
            'password': Cypress.env('ADMIN_PASSWORD')
        }
      }).then((resp) => {
          return resp.body.id.split('ITEM-')[1]
        })
    })
})

Cypress.Commands.add('uploadAssetFromDisk', (placeholderID, assetName, assetType) => {
  let filePath = ''
  if (assetType === 'png') {
     filePath = './cypress/fixtures/sampleImage.png'
  } else if (assetType === 'mp4') {
     filePath = './cypress/fixtures/sampleVideo.mp4'
  } else {
    throw 'Unknown file format'
  }
    const uploadedFile = cy.task('sendBinary', { placeholderID: placeholderID, filePath: filePath, assetName: assetName }).then((resp) => {
  })
})
