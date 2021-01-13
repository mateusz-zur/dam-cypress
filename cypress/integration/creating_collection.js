describe('Creating collection', () => {
  it('Adding an asset to new collection', () => {
    cy.createAssetPlaceholder().then((assetID) => {
      cy.uploadAssetFromDisk(assetID, 'asset_name', 'png')
      cy.visit(`${Cypress.env('APP_URL')}/search/#/?p=1&q=`, {
        auth: {
          'username': Cypress.env('ADMIN_LOGIN'),
          'password': Cypress.env('ADMIN_PASSWORD')
      }})
      cy.xpath('//input[contains(@placeholder, "Search assets")]').first().type(assetID).type('{enter}')
      cy.get('span.item-selector').click()
      cy.get('i.icon-options').click()
      cy.xpath('//span[text()="Add to collection"]').click()
      cy.xpath('//span[text()="Create a new collection"]').click()
      const collectionName = 'Numbers collection'
      cy.get('input#new-collection-name').type(collectionName)
      cy.xpath('//button[text()="Add to collection"]').click()
      cy.wait(1000)
      cy.visit(`${Cypress.env('APP_URL')}/collections/#/?p=1&q=`)
      cy.xpath('//input[contains(@placeholder, "Search collections")]').first().type(collectionName).type('{enter}')
      cy.get('span.item-name').should('have.text', collectionName)
    })
  })
})
