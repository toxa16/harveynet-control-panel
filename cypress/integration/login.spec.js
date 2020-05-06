describe('Login', () => {
  it('should render Login Page by default', () => {
    cy.visit('/');
    cy.get('[data-testid="login-page"]');
  });
});
