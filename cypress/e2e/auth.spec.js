describe('Auth', () => {
  it('should login and logout', () => {
    // visit homepath
    cy.visit('/');

    // type "alice" into the login form "username" field
    cy.get('[data-cy="login-form"]')
      .find('[name="username"]')
      .type('alice');

    // submit the login form
    cy.get('[data-cy="login-form"]').submit();

    // see "session" view
    cy.get('[data-cy="session"]');

    // click the "logout" link
    cy.get('[data-cy="logout-link"]')
      .click();

    // see the login form (i.e. "you've logged out")
    cy.get('[data-cy="login-form"]');
  });
});
