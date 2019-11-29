describe('Machine List', () => {
  it('should render the user\'s machines', () => {
    // authenticate as user "alice"
    cy.setCookie('username', 'alice');
    // visit the app home path
    cy.visit('/');

    const machinesFixture = ['machine1', 'machine2'];  // fixture

    // see machine list containing user machines
    cy.get('[data-cy="machine-list"]')
      .children()
      .should('have.length', machinesFixture.length);

    // the list should include first machine...
    cy.get('[data-cy="machine-list"]').contains(machinesFixture[0]);
    // ...and the second one as well
    cy.get('[data-cy="machine-list"]').contains(machinesFixture[1]);
  });
});
