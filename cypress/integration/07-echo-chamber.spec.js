/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    // Element on the page
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    // Browser title
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('contain', 'sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]').click();
    cy.location('pathname').should('contain', 'sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
    cy.get('[data-test="sign-up-email"]').as('sign-up-email');
    cy.get('[data-test="sign-up-password"]').as('sign-up-pass');
  });

  it('should require an email', () => {
    cy.get('@submit').click();

    // Invalid pseudo element - this floating message, text checking approach
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');

    // Alternative - better and time proof checking validity prop
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@sign-up-email').type('xd');
    cy.get('@submit').click();

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', `Please include an '@'`);

    // Alternative - better and time proof
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true');
  });

  it('should require a password when the email is present', () => {
    // cy.get('@sign-up-email').type('valid33@gmail.com');
    // cy.get('@submit').click();

    // Alternative - how to type enter
    cy.get('@sign-up-email').type('valid33@gmail.com{enter}');

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');
  });
});
