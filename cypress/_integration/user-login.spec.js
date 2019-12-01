/**
 * DEPRECATED
 * TODO: REMOVE
 */
describe.skip('User Login', () => {
  it('should login when username query param is set', () => {
    cy.visit('/?username=alice');
    cy.get('#restricted-page');
  });

  it('should log in', () => {
    cy.visit('/');

    // enter username
    cy.get('#login-form')
      .find('[name="username"]')
      .type('alice');

    // submit form
    cy.get('#login-form').submit();

    // see restricted area
    cy.get('#restricted-page');
    // see username in query parameter
    cy.url().should('include', 'username=alice');
  });

  it('should logout', () => {
    const username = 'bob';

    // visit / with username in query
    cy.visit(`/?username=${username}`);
    // see restricted area
    cy.get('#restricted-page');

    // wait for ownership backend data
    //cy.wait(3000);

    // find the logout button and see it contains the username
    // then click on it
    cy.get('#logout-button').contains(username).click();

    // see the login form
    cy.get('#login-form');
    // see no username query parameter in url
    cy.url().should('not.include', 'username=');
  });
});
