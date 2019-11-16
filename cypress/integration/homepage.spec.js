describe('Homepage', () => {
  it('should contain itself', () => {
    // visit app dev URL
    cy.visit('http://localhost:3000/');
    // see the homepage element
    cy.get('[data-cy="somepage"]');
  });
});
