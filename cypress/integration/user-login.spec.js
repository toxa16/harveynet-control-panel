describe('User Login', () => {
  it('should login when username query param is set', () => {
    cy.visit('/?username=alice');
    cy.get('#restricted-page');
  });

  it('should login and logout', () => {
    cy.visit('/');

    // enter username
    cy.get('#login-form')
      .find('[name="username"]')
      .type('alice');

    // submit form
    cy.get('#login-form').submit();

    // see restricted area
    cy.get('#restricted-page');
    // see username in query parameter
    cy.url().should('include', 'username=alice');

    // find the logout button and see it contains the username
    // then click on it
    cy.get('#logout-button').contains('alice').click();

    // see the login form
    cy.get('#login-form');
    // see no username query parameter in url
    cy.url().should('not.include', 'username=');
  });
});
