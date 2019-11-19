describe('Machine Control', () => {
  it('should open machine control screen', () => {
    // enter as alice
    cy.visit('/?username=alice');

    // click the first machine
    cy.get('[data-cy="machine-list"]')
      .children()
      .first()
      .click();

    // see the machine control screen
    // find and click the "back" link
    cy.get('[data-cy="machine-control"]')
      .find('[data-cy="machine-control__back-link"]')
      .click();

    // see the machine list
    cy.get('[data-cy="machine-list"]');
  });
});
