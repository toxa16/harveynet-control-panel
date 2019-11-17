describe('Machine List', () => {
  it('should render the user\'s machines', () => {
    // visit the app as alice
    cy.visit('/?username=alice');

    const myMachines = ['machine1', 'machine2'];  // fixture

    // see machine list containing user machines
    cy.get('[data-cy="machine-list"]')
      .children()
      .each(($el, i) => {
        cy.wrap($el).contains(myMachines[i])
      });
  });
});
