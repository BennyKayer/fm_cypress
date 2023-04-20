/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties) {
    it(`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`);
    });

    it(`should hide the ${property} column if unchecked`, () => {
      cy.get(`#show-${property}`).uncheck();
      cy.get(`#${property}-column`).should('be.hidden');
    });
  }

  restaurants.forEach((restaurant) => {
    it(`should only display rows that match ${restaurant} when selected`, () => {
      cy.get('@restaurant-filter').select(restaurant);
      cy.get(`td[headers="whereToOrder-column"]`).should('contain', restaurant);
    });
  });

  ratings.forEach((rating) => {
    it(`should hide table rows with rating lower than ${rating}`, () => {
      cy.get('#minimum-rating-visibility').invoke('val', `${rating}`).trigger('input');
      cy.get('.popularity').each((el) => {
        expect(+el.text()).to.be.gte(rating);
      });
    });
  });
});
