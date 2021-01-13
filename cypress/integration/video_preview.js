describe('Video preview', () => {
  it('Volume control on video', () => {
    cy.createAssetPlaceholder().then((assetPlaceholderID) => {
      cy.uploadAssetFromDisk(assetPlaceholderID, 'asset_name', 'mp4')
      cy.wait(120 * 1000)
      cy.visit(`${Cypress.env('APP_URL')}/asset/#/${assetPlaceholderID}/metadata`, {
        auth: {
          'username': Cypress.env('ADMIN_LOGIN'),
          'password': Cypress.env('ADMIN_PASSWORD')
      }})
      cy.get('div.asset-preview').click()
      cy.get('div.video-react-volume-bar').invoke('attr', 'aria-valuenow').then((volumeLevel) => {
        cy.get('div.video-react-volume-bar').click()
        cy.get('div.video-react-volume-bar').invoke('attr', 'aria-valuenow').then((newVolumeLevel) => {
          expect(newVolumeLevel).to.not.equal(volumeLevel)
        })
      })
    })
  })
})
