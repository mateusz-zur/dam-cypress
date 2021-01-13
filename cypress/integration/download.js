const path = require('path')

describe('Download', () => {
  const downloadsFolder = 'cypress/downloads'
  
  beforeEach(() => {
    cy.task('clearDownloads')
    if (!Cypress.isBrowser('firefox')) {
      cy.log('Page.setDownloadBehavior')
      cy.wrap(
        Cypress.automation('remote:debugger:protocol',
          {
            command: 'Page.setDownloadBehavior',
            params: { behavior: 'allow', downloadPath: downloadsFolder },
          }),
        { log: false }
      )
    }
  })

  const validateImage = () => {
    const downloadedFilename = path.join(downloadsFolder, 'assetA')
    cy.readFile(downloadedFilename, 'binary', { timeout: 1500 })
    .should((buffer) => {
      expect(buffer.length).to.be.gt(0)
    })
  }
  it.skip('Downloading original shape from available formats', () => {
    // Failing due to https://github.com/cypress-io/cypress/issues/949
    cy.createAssetPlaceholder().then((assetAID) => {
      cy.uploadAssetFromDisk(assetAID, 'assetA', 'png')
      cy.wait(5 * 1000)
      cy.visit(`${Cypress.env('APP_URL')}/asset/#/${assetAID}/metadata`, {
        auth: {
          'username': Cypress.env('ADMIN_LOGIN'),
          'password': Cypress.env('ADMIN_PASSWORD')
      }})
      cy.xpath('//span[contains(text(), "Original")]').click()
      validateImage()
    })
  })
})
