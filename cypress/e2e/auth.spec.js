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
    
    // see "main" view
    cy.get('[data-cy="main"]');
  });
});
