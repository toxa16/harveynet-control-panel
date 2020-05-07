describe.skip('Root "/"', () => {
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

  describe('when `access_token` url fragment property is present', () => {
    it('should set `access_token` cookie and redirect to "/panel"', () => {
      const token = 'STUB_ACCESS_TOKEN';
      cy.visit(`/#access_token=${token}`);
      cy.wait(100);   // wait for detecting the document.cookie command
      cy.getCookie('access_token', { log: true })
        .should('have.property', 'value', token)
      cy.url().should('eq', Cypress.config().baseUrl + '/panel');
    });
  });
});
