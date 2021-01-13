describe('Roles and groups', () => {
  it('Creating new role', () => {
    cy.visit(`${Cypress.env('APP_URL')}/admin/auth/#/role`, {
      auth: {
        'username': Cypress.env('ADMIN_LOGIN'),
        'password': Cypress.env('ADMIN_PASSWORD')
    }})
    const roleName = 'Duck role'
    const addedPermission = 'Can download original'
    cy.xpath('//button[text()="Create role"]').click()
    cy.get('input#name').type(roleName)
    cy.get('textarea#description').type('A lot of ducks')
    cy.get('input.filterInput').first().type(addedPermission)
    cy.xpath(`//div[text()="${addedPermission}"]`).click()
    cy.xpath('//button[text()="Save"]').click()
    cy.xpath(`//td//span[text()="${roleName}"]`).should('contain', roleName)
  })
})
