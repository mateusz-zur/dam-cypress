describe('File upload', () => {
  it('Upload a file', () => {
    cy.visit(`${Cypress.env('APP_URL')}/search/#/?p=1&q=`, {
      auth: {
        'username': Cypress.env('ADMIN_LOGIN'),
        'password': Cypress.env('ADMIN_PASSWORD')
    }})
    cy.get('i.icon-cloud-upload').first().click()
    const fixtureFile = 'sampleImage.png';
    cy.get('input#file').attachFile(fixtureFile);
    cy.get('input[name="basic_info_asset_title"]').type('test01')
    cy.xpath('(//span[contains(text(), "Brand")])/../..//div[contains(@class, "searchableMultiSelect")]').first().click()
    cy.get('div.searchable-input__option').contains('Visage Fashion').click()
    cy.xpath('(//span[contains(text(), "Campaign")])/../..//div[contains(@class, "searchableMultiSelect")]').first().click()
    cy.get('div.searchable-input__option').contains('Visage Gold').click()
    cy.get('input[name="mediatypevideo_broadcast_ready"]').check('true')
    cy.get('button.zonza-button').contains('Upload content').click()
    cy.get('h1').should('contain', 'Your content has been submitted')
    cy.get('a').should('contain', 'sampleImage.png')
  })
})
