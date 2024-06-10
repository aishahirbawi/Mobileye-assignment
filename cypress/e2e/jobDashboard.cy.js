describe('Job Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Logs in and views job details', () => {
    // Log in
    cy.contains('Login').click();
    cy.get('#username').type('Aisha');
    cy.get('#password').type('aisha');
    cy.contains('button', 'Login').click();

    // Wait for jobs to load
    cy.wait(2000); // Adjust the wait time based on your application

    // Click on a job
    cy.get('.job-item').first().click();

    // Verify job details are displayed
    cy.get('.job-details').should('be.visible');
  });
});
