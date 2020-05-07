import auth0 from 'auth0';


const domain = Cypress.env('AUTH0_DOMAIN');
const clientId = Cypress.env('AUTH0_CLIENT_ID');
const clientSecret = Cypress.env('AUTH0_CLIENT_SECRET');
const realm = Cypress.env('AUTH0_REALM');

const username = 'alice@email.com';
const password = 'Alice1111$';


describe('Panel scenario', () => {
  let accessToken;

  beforeEach(done => {
    // loading fixtures
    // TODO: simply `import` fixtures
    cy.fixture('alice-machines.json').as('expectedMachines');

    // getting real access token
    const authClient = new auth0.AuthenticationClient({
      domain, clientId, clientSecret,
    });
    authClient.passwordGrant({ username, password, realm })
      .then(authData => {
        accessToken = authData.access_token;
        done();
      });
  });

  it('authenticate, render user machines', function () {
    cy.visit(`/login#access_token=${accessToken}`); // simulating login

    const actualMachines = [];
    cy.get('[data-testid="machine-card"]')
      .each($el => {
        const machineId = $el[0].innerText;  // HACK
        actualMachines.push({ machineId });
      })
      .then(() => {
        expect(actualMachines).to.deep.equal(this.expectedMachines);
      });
  });
});
