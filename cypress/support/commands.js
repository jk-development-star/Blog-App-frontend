// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/blog-list')
})
//// cypress/support/commands.js
// Cypress.Commands.add('login', (username, password) => {
//     cy.visit('/login'); // Visit the login page
//     cy.get('input[name="username"]').type(username); // Enter the username
//     cy.get('input[name="password"]').type(password); // Enter the password
//     cy.get('button[type="submit"]').click(); // Click the submit button

//     // You can optionally add assertions to verify successful login
//     cy.url().should('include', '/dashboard'); // Assert that the URL contains '/dashboard' after successful login
// });

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })