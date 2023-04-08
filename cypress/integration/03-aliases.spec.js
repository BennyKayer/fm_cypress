/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="items-unpacked"]').as('itemsUnpacked');
    cy.get('[data-test="items-packed"]').as('itemsPacked');
    cy.get('[data-test="filter-items"]').as('filterItems');
    cy.get('[data-test="items"]').as('allItems');
  });

  describe('testing filtering', () => {
    it('should filter items from both lists', () => {
      const searchTerm = 'Tooth';
      cy.get('@filterItems').type(searchTerm);

      cy.get('@allItems').should('contain.text', searchTerm);
      cy.get('@allItems').should('not.contain.text', 'iPhone Charger');
    });

    it('should move elements from unpacked to packed on click', () => {
      cy.get('@itemsUnpacked').find('ul').find('li').first().as('firstUnpackedItem');
      cy.get('@firstUnpackedItem').contains('Tooth Brush');
      cy.get('@firstUnpackedItem').find('label').click();
      cy.get('@itemsUnpacked').should('not.contain.text', 'Tooth Brush');
      cy.get('@itemsPacked').should('contain.text', 'Tooth Brush');
    });
  });
});
