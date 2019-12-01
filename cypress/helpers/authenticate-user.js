export default function authenticateUser(username) {
  cy.setCookie('username', username);
}
