describe('Panel scenario', () => {
  beforeEach(() => {
    cy.fixture('alice-machines.json').as('expectedMachines');
  });

  it('authenticate, render user machines', function () {
    const accessToken = 'ACCESS_TOKEN_STUB';  // alice's token
    cy.visit(`/login#access_token=${accessToken}`); // simulating login

    const actualMachines = [];
    cy.get('[data-testid="machine-card"]')
      .each($el => {
        const machineId = $el[0].innerText;  // HACK
        actualMachines.push({ machineId });
      })
      .then(() => {
        expect(actualMachines).to.deep.equal(this.expectedMachines);
      });
  });
});
