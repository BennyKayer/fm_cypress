/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should have a form', () => {
    cy.get('form').should('exist');
    cy.get('xd').should('not.exist');
  });

  it('should have the words Add Item', () => {
    cy.contains('Add Item');
  });
});

describe('Exercise, Basic Practice', () => {
  // - Adding a new item
  it('should add a new item to unpacked', () => {
    cy.get('[data-test="add-item"]').should('be.disabled');
    cy.get('[data-test="new-item-input"]').type('Spare Socks');
    cy.get('[data-test="add-item"]').should('be.enabled');
    cy.get('[data-test="add-item"]').click();
    cy.get('[data-test="items-unpacked"]').contains('Spare Socks');
    cy.get('[data-test="items-unpacked"] li').last().contains('Spare Socks');
  });

  // - Filtering the items on the page
  it('should filter items on the page', () => {
    cy.get('[data-test="filter-items"]').type('tooth');
    cy.get('[data-test="items-unpacked"]').contains('Tooth Brush');
    cy.get('[data-test="items-unpacked"]').contains('Tooth Paste');
    cy.contains('Hoodie').should('not.exist');
    cy.get('[data-test="items"] li').each(($item) => {
      expect($item.text()).to.include('Tooth');
    });
    cy.get('[data-test="filter-items"]').clear();
  });

  // - Removing an item from the page
  it('should remove an item from the page', () => {
    cy.get(':nth-child(2) > [data-test="remove"]').click().should('not.exist');
    // his version is lengthy
    // cy.get('[data-test="items"] li').each((li) => {
    //   cy.wrap(li).find('[data-test="remove"]').click();
    //   cy.wrap(li).should('not.exist');
    // });
  });

  // - Marking all of the items as unpacked
  it('should mark all the items as unpacked', () => {
    cy.get('[data-test="mark-all-as-unpacked"]').click();
    cy.get('[data-test="items-packed"]').contains('No items to show.');
  });

  // - Marking an individual item as packed
  it('should mark individual item as packed', () => {
    cy.get('#item-1').click();
    cy.get('[data-test="items-packed"]').contains('Tooth Brush');
  });

  // - Removing all of the items from the page
  it('should remove all of the items from the page', () => {
    cy.get('[data-test="remove-all"]').click();
    cy.get('[data-test="items-packed"] li').should('not.exist');
    cy.contains('No items to show.');
  });
});
