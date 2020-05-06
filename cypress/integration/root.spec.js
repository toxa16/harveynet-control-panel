describe('Root "/"', () => {
  describe('by default', () => {
    it('should redirect to "/login"', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/login');
      cy.get('[data-testid="login-page"]');
    });
  });

  describe('when `access_token` cookie is set', () => {
    it('should redirect to "/panel"', () => {
      cy.setCookie('access_token', 'STUB_ACCESS_TOKEN');
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/panel');
    });
  });
});
