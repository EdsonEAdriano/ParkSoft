describe('Teste de Visibilidade dos Elementos', () => {
    it('Deve verificar se os elementos estão visíveis', () => {
        cy.visit('URL_DO_SEU_SITE'); // Substitua pela URL do seu site

        // Verifica se o título está visível
        cy.get('h1').should('be.visible'); // Substitua 'h1' pelo seletor do seu título

        // Verifica se o botão está visível
        cy.get('button#meuBotao').should('be.visible'); // Substitua 'button#meuBotao' pelo seletor do seu botão

        // Verifica se a imagem está visível
        cy.get('img#minhaImagem').should('be.visible'); // Substitua 'img#minhaImagem' pelo seletor da sua imagem
    });
});