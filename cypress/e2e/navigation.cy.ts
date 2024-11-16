describe('Teste de Navegação entre Páginas', () => {
    it('Deve navegar para a página "Sobre" ao clicar no link', () => {
        cy.visit('URL_DA_PAGINA_INICIAL'); // Substitua pela URL da sua página inicial

        // Verifica se o link "Sobre" está visível e clica nele
        cy.get('a#linkSobre').should('be.visible').click(); // Substitua 'a#linkSobre' pelo seletor do seu link

        // Verifica se a URL mudou para a página "Sobre"
        cy.url().should('include', '/sobre'); // Substitua '/sobre' pela parte da URL da sua página "Sobre"

        // Verifica se um elemento específico da página "Sobre" está visível
        cy.get('h1').should('contain', 'Sobre'); // Verifica se o título da página "Sobre" contém o texto "Sobre"
    });
});