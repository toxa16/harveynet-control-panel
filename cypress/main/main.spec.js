/**
 * THIS TEST SUITE IS POSSIBLY REDUNDANT.
 */
describe.skip('Main', () => {
  it('should open control and close control', () => {
    // visit homepath
    cy.visit('/');

    // see "session" view
    cy.get('[data-cy="session"]');
  });
});
