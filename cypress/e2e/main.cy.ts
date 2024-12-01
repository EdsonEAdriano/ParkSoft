describe('Teste de Criação de Entrada', () => {
    it('Deve criar uma entrada', () => {
        cy.visit('http://localhost:3000/entries'); // Substitua pela URL do seu site

        cy.get('button.add-button').click();
        cy.wait(3000);


        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form').then((form) => {
            form.on('submit', (e) => {
                e.preventDefault(); // Previne o envio automático
            });
        });

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > select').select('Moto');


        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > input:nth-child(4)').type('Yamaha');

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > input:nth-child(6)').type('MT-07');

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(7) > div.col > input').type('ABC3E432');

        cy.get('#colorSelect').select('Chartreuse');

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(8) > div:nth-child(1) > div.AddressSelector_container__eF0qw > div > input').click();
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(8) > div:nth-child(1) > div.AddressSelector_container__eF0qw > div.AddressSelector_dropdown__2p__g > div:nth-child(2) > button:nth-child(3)').click();

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > button').click();
        
        cy.wait(3000);

        cy.get('body > div:nth-child(2) > div > div:nth-child(2) > div > div.info-container > div > p > b')
            .should('contain.text', 'Yamaha');


        cy.get('body > div:nth-child(2) > div > div:nth-child(2) > div > div.button-container > button:nth-child(2)').click();
        cy.wait(2000);
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > button.delete-button').click();


    });
});