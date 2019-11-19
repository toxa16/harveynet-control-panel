describe('Machine Control', () => {
  it('should open machine control screen', () => {
    // enter as alice
    cy.visit('/?username=alice');

    // click the first machine
    cy.get('[data-cy="machine-list"]')
      .first()
      .click();

    // see the machine control screen
    cy.get('[data-cy="machine-control"]');
  });
});
