describe(`Test Cocolis`, () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it(`Everything is initialized`, () => {
      cy.visit('http://localhost:3000/');

      cy.intercept('POST', 'https://staging.cocolis.fr/es/rides/_search').as('getDatas');

      cy.wait('@getDatas').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
      cy.get('.mapboxgl-canvas').eq(0).should('exist');
      
      cy.get('.deliveryContainer').should('have.length', 5);
      cy.get('.customMarker').should('have.length', 10);
      
      cy.get('.loadMoreDelivery').eq(0).click();
      
      cy.get('.deliveryContainer').should('have.length', 10);
      cy.get('.customMarker').should('have.length', 20);

      
    });
});
