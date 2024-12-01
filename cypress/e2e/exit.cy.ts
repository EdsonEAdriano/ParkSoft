import setDateCy from "../../helper/setDateCy";

describe('Teste de Criação de Entrada e Realização da Saída', () => {
    it('Deve criar uma entrada e realizar a saída', () => {
        cy.visit('http://localhost:3000/entries'); // Substitua pela URL do seu site

        // Clicar no botão para adicionar uma entrada
        cy.get('button.add-button').click();
        cy.wait(3000);

        // Selecionar o formulário e prevenir o envio automático
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form').then((form) => {
            form.on('submit', (e) => {
                e.preventDefault(); // Previne o envio automático
            });
        });

        // Preencher os campos do formulário
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > select').select('Moto');
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > input:nth-child(4)').type('Yamaha');
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > input:nth-child(6)').type('MT-07');
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(7) > div.col > input').type('ABC3E432');
        cy.get('#colorSelect').select('Chartreuse');

        // Selecionar endereço
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(8) > div:nth-child(1) > div.AddressSelector_container__eF0qw > div > input').click();
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(8) > div:nth-child(1) > div.AddressSelector_container__eF0qw > div.AddressSelector_dropdown__2p__g > div:nth-child(2) > button:nth-child(3)').click();

        // Submeter o formulário
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > button').click();
        cy.wait(3000);

        // Verificar se a entrada foi criada corretamente
        cy.get('body > div:nth-child(2) > div > div:nth-child(2) > div > div.info-container > div > p > b')
            .should('contain.text', 'Yamaha');

        // Clicar no botão para realizar a saída
        cy.get('body > div:nth-child(2) > div > div:nth-child(2) > div > div.button-container > button.button.primary').click();
        cy.wait(2000);

        // Obter a data e hora atuais e adicionar uma hora
        const now = new Date();

        // Adicionar verificação para assegurar que a data é válida
        if (isNaN(now.getTime())) {
            throw new Error('Data inválida ao obter a hora atual.');
        }

        now.setHours(now.getHours() + 1); // Adicionar uma hora

        // Formatar a data no formato 'YYYY-MM-DDTHH:MM'
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Montar a string no formato necessário
        const newDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

        // Adicionar log para verificação
        console.log('Novo valor datetime-local:', newDateTime);

        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > div:nth-child(9) > div:nth-child(1) > div > input')
            .then(input => setDateCy(input[0], newDateTime));

        // Submeter novamente o formulário (se necessário)
        cy.get('body > div:nth-child(2) > div > div.Modal_overlay__e96nE > div > div > form > button').click();

        cy.wait(2000);

        cy.get('body > div:nth-child(2) > div > div:nth-child(2) > div > div.info-container > span.status')
            .should('have.text', 'Fechado');
    });
});
