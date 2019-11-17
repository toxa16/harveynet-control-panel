describe('Happy Path', () => {
  it('should work', () => {
    // go to homepage
    cy.visit('/'); 

    // enter email
    cy.get('#login-form')
      .find('[name="email"]')
      .type('alice@email.com');

    // enter password
    cy.get('#login-form')
      .find('[name="password"]')
      .type('Alice1111$');

    // submit form
    cy.get('#login-form').submit();

    // see restricted area
    cy.get('#restricted-page');

    // find the logout button and click it
    cy.get('#logout-button').click();

    // see the login form
    cy.get('#login-form');
  });
});
