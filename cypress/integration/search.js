describe('Search', () => {
  it('Pagination assets on search page', () => {
    for (let i = 0; i < 62; i++) {
      cy.createAssetPlaceholder().then((assetAID) => {
        cy.uploadAssetFromDisk(assetAID, 'assetA', 'png')
    })
    }
    cy.visit(`${Cypress.env('APP_URL')}/search/#/?p=1&q=`, {
      auth: {
        'username': Cypress.env('ADMIN_LOGIN'),
        'password': Cypress.env('ADMIN_PASSWORD')
    }})
    cy.get('div.page-numbers').should('contain', 'showing 1 - 60 of')
    cy.get('a.item-link').should('have.length', 60)
  })
  it('Headers on list view of assets', () => {
    cy.visit(`${Cypress.env('APP_URL')}/search/#/?p=1&q=`, {
      auth: {
        'username': Cypress.env('ADMIN_LOGIN'),
        'password': Cypress.env('ADMIN_PASSWORD')
    }})
    cy.get('div.view-switcher').click()
    cy.get('button.dropdown-item span').contains('List view').click()
    cy.get('th.image-header').should('contain', 'File')
    cy.get('th.brand-header').should('contain', 'Brand')
    cy.get('th.client-header').should('contain', 'Client')
    cy.get('th.fido-header').should('contain', 'Fido Projects Job ID')
  })
})
