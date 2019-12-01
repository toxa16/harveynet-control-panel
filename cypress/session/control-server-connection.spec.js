describe('Control Server Connection (WebSocket)', () => {
  it.skip('should handle websocket "close" event and reconnect');
  it.skip('should handle websocket "error" event and reconnect');

  it('should connect to websocket and handle "close" event', () => {
    cy.visit('/');
    cy.get('[data-cy="session-connecting"]');

    // simulate websocket "open" event

    cy.get('[data-cy="session-open"]');
  });

  it.skip('should connect to websocket and handle "error" event');
});
