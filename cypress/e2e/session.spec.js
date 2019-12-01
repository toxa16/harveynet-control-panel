describe('Session', () => {
  it('should render the user\'s machines', () => {
    // authenticate as user "alice"
    cy.setCookie('username', 'alice');
    // visit the app home path
    cy.visit('/');

    // see the "session" view
    cy.get('[data-cy="session"]');
  });
});
