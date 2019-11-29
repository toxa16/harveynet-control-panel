describe.skip('Machine List', () => {
  it('should render the user\'s machines', () => {
    // visit the app as alice
    cy.visit('/?username=alice');

    const machinesFixture = ['machine1', 'machine2'];  // fixture

    // see machine list containing user machines
    cy.get('[data-cy="machine-list"]')
      .children()
      .should('have.length', machinesFixture.length)
      .each(($el, i) => {
        cy.wrap($el).contains(machinesFixture[i])
      });
  });
});
