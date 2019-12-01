describe('Session-Control', () => {
  it('should navigate from session machine list to control and back', () => {
    // authenticate as user "alice"
    cy.setCookie('username', 'alice');
    // visit the app home path
    cy.visit('/');

    // see the "session" view with "machine list"
    // click the "control link"
    cy.get('[data-cy="session"]')
      .find('[data-cy="machine-list"]')
      .find('[data-cy="control-link"]')
      .click();

    // see the "control" view
    cy.get('[data-cy="control"]');

    // click the back ("session") link
    cy.get('[data-cy="session"]')
      .find('[data-cy="session-link"]')
      .click();

    // see the "machine list" again
    cy.get('[data-cy="machine-list"]');
  });
});
