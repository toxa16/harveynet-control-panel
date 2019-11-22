const defaultControlServerUrl =
  'wss://harveynet-control-server.herokuapp.com';

describe('Machine Control', () => {
  it('should open machine control screen', () => {
    // enter as alice
    cy.visit('/?username=alice');

    // click the first machine
    cy.get('[data-cy="machine-list"]')
      .children()
      .first()
      .click();

    // see the machine control screen
    // find and click the "back" link
    cy.get('[data-cy="machine-control"]')
      .find('[data-cy="machine-control__back-link"]')
      .click();

    // see the machine list
    cy.get('[data-cy="machine-list"]');
  });

  it('should update machine online status', () => {
    // enter as alice
    cy.visit('/?username=alice');

    // click the first machine
    cy.get('[data-cy="machine-list"]')
      .children()
      .first()
      .click();

    // see machine status "Offline"
    cy.get('[data-cy="machine-control"]')
      .find('[data-cy="machine-status"]')
      .contains('Offline');

    // setup for connecting to the Control Server
    const controlServerUrl =
      Cypress.env('CONTROL_SERVER_URL') ||
      defaultControlServerUrl;
    let socket;

    // wait 1 miliecond
    // and then connect to Control Server as a machine "machine1"
    cy.wait(1).then(() => {
      socket = new WebSocket(`${controlServerUrl}/?machine_id=machine1`);
    });
    
    // see machine status "Online"
    cy.get('[data-cy="machine-control"]')
      .find('[data-cy="machine-status"]')
      .contains('Online');

    // wait 1 miliecond
    // and then disconnect the machine
    cy.wait(1).then(() => {
      socket.close();
    });

    // see machine status "Offline"
    cy.get('[data-cy="machine-control"]')
      .find('[data-cy="machine-status"]')
      .contains('Offline');
  });
});
