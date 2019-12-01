import authenticateUser from './authenticate-user';

describe('Session', () => {
  it('should open a websocket session', () => {
    // authenticate as user "alice"
    authenticateUser('alice');
    // visit the app home path
    cy.visit('/');

    // see session open screen
    cy.get('[data-cy="session-open-view"]');
  });
});
