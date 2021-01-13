describe('Supporting files', () => {
  it('Make a supporting file', () => {
    const supportingFileName = 'assetB'
    cy.createAssetPlaceholder().then((assetAID) => {
      cy.uploadAssetFromDisk(assetAID, 'assetA', 'png')
      cy.createAssetPlaceholder().then((assetBID) => {
        cy.uploadAssetFromDisk(assetBID, supportingFileName, 'png')
        cy.visit(`${Cypress.env('APP_URL')}/asset/#/${assetAID}/metadata`, {
          auth: {
            'username': Cypress.env('ADMIN_LOGIN'),
            'password': Cypress.env('ADMIN_PASSWORD')
        }})
        cy.xpath('//a[text()="Supporting files"]').click()
        cy.get('div.dropdown-title').click()
        cy.xpath('//button[text()="Relate existing assets"]').click()
        cy.get('input#search-query').type(supportingFileName).type('{enter}')
        cy.get('span.item-selector').first().click()
        cy.xpath('//button[text()="Make supporting file"]').click()
        cy.get('div.SupportingFilesList span.item-name').should('have.text', supportingFileName)
      })
    })
  })
})
