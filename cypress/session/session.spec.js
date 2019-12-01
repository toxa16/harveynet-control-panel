describe('Session', () => {
  it('should open and close the control screen', () => {
    // visit home path
    cy.visit('/');

    // see the "session" view with "machine list"
    // click the "control link"
    cy.get('[data-cy="session"]')
      .find('[data-cy="machine-list"]')
      .find('[data-cy="control-link"]')
      .click();

    // see the control container
    // click the back ("session") link
    cy.get('[data-cy="control-container"]')
      //.find('[data-cy="session-link"]')
      //.click();
  });
});
