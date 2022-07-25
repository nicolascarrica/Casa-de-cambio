

const URL = 'http://127.0.0.1:8080/index.html';

context('Test casa cambio', () => {
  
  before(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  describe('Comprobación de la existencia de todos los componentes', () => {
    it('Se asegura de que haya un título', () => {
      cy.get('main').find('h1').should('be.visible');
    });
    it('Se asegura que cargue la fecha', () => {
      cy.get('#ultima-actualizacion').should('be.visible');
    });
    it('se asegura que carga la tabla', () =>{
      cy.get('#tabla').should('be.visible');
    }); 

  });


  describe('funcionamiento del exchange', () => {
    it('se asegura que funcione cuando cambia la moneda base', () =>{
      cy.get('#monedas').select('USD')
      cy.get('#actualizar').click();
    });
    it('se asegura que puede pasar a la ventana de cotizacion', () =>{
      cy.get('#convertidor').click();
    });
    it('se asegura que se puedan cambiar las monedas inciales y finales', () =>{
      cy.get('#moneda-inicial').select('USD');
      cy.get('#moneda-final').select('EUR');
    });
    it('se asegura que funciona el convertidor', () =>{
      cy.get('#cantidad-conversion').type(2);
      cy.get('#convertir').click();
      cy.get('#texto-resultado').should('be.visible');
      cy.get('#resultado').should('be.visible');
      cy.get('#texto-final').should('be.visible');
    });


  });
  
});