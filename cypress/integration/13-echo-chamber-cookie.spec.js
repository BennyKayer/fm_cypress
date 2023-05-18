/// <reference types="cypress" />
// Testing Cookies & Sessions
import '../support/commands-complete';

const user = {
  email: 'first@example.com',
  password: 'password123',
};

export const decodeToken = (token) => JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
export const encodeToken = (token) => Buffer.from(JSON.stringify(token)).toString('base64');

describe('Signing in with a seeded database', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
    cy.signIn(user);
  });

  it('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('should set a cookie', () => {
    cy.getCookie('jwt').then((cookie) => {
      const value = decodeToken(cookie.value);
      expect(value.email).to.equal(user.email);
    });
  });
});

describe('Setting the cookie', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
    cy.setCookie('jwt', encodeToken({ id: 999, email: user.email }));
    cy.visit('/echo-chamber/sign-in');
  });

  it('show that user on the page', () => {
    cy.contains(user.email);
  });
});

describe('Setting the cookie with real data', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
  });
});
