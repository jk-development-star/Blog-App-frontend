describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display login form', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('abc@email.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/blog-list');
  });

  it('should display error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invaliduser@mail.com');
    cy.get('input[name="password"]').type('invalidpassword123');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-danger').should('be.visible');
  });
});
