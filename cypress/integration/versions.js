describe('Versions', () => {
  it('Uploading new version', () => {
    cy.createAssetPlaceholder().then((assetAID) => {
      cy.uploadAssetFromDisk(assetAID, 'assetA', 'png')
      cy.visit(`${Cypress.env('APP_URL')}/asset/#/${assetAID}/metadata`, {
        auth: {
          'username': Cypress.env('ADMIN_LOGIN'),
          'password': Cypress.env('ADMIN_PASSWORD')
      }})
      cy.get('button.options-button').click()
      cy.get('button.upload-version-option').click()
      const fixtureFile = 'sampleImage.png';
      cy.get('input#file').attachFile(fixtureFile);
      cy.get('button.zonza-button').contains('Upload content').click()
      cy.get('h1').should('contain', 'Your version has been submitted')
    })
  })
})
