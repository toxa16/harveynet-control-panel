describe('User Login', () => {
  it('should login when username query param is set', () => {
    cy.visit('/?username=alice');
    cy.get('#restricted-page');
  });
});
