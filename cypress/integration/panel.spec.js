describe('Panel scenario', () => {
  it('authenticate, render user machines', () => {
    const accessToken = 'ACCESS_TOKEN_STUB';
    cy.visit(`/login#access_token=${accessToken}`);

    cy.get('[data-testid="machine-card"]');

    // reference
    //expect(true).to.equal(false)
  });
});
