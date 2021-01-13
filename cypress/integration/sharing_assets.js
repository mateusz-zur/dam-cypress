describe('Sharing assets', () => {
  it('Sharing an asset with its supporting files to an external user',() => {
    cy.createAssetPlaceholder().then((assetAID) => {
      cy.uploadAssetFromDisk(assetAID, 'assetA', 'png')
      const externalEmail = 'merrik.kegan@auweek.net'
      cy.visit(`${Cypress.env('APP_URL')}/asset/#/${assetAID}/metadata`, {
        auth: {
          'username': Cypress.env('ADMIN_LOGIN'),
          'password': Cypress.env('ADMIN_PASSWORD')
      }})
      cy.xpath('//a[text()="Shares"]').click()
      cy.get('button.create-share-btn').click()
      cy.xpath('//a[text()="External users"]').click()
      cy.get('div.ZonzaChipInput__placeholder').type(externalEmail)
      cy.xpath('//label[@class="form-check-label" and text()="Yes"]//input[@name="externalsShareOriginalRadioInput"]').click()
      cy.xpath('//label[@class="form-check-label" and text()="Yes"]//input[@name="externalsRadioInput"]').click()
      cy.xpath('//button[text()="Share"]').click()
      cy.xpath('//table[contains(@class, "shares-table External")]//td', { timeout: 10 * 1000 }).first().should('have.text', externalEmail)
    })
  })
})
