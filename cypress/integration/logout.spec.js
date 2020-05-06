describe('Logout "/logout"', () => {
  it('should clear `access_token` cookie and redirect to "/login"', () => {
    cy.setCookie('access_token', 'STUB_ACCESS_TOKEN');
    cy.visit('/logout');
    cy.wait(100);   // wait for `document.cookie` command
    cy.getCookie('access_token').should('not.exist');
  });
});
