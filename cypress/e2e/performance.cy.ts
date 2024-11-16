describe('Teste de Tempo de Carregamento da Página', () => {
    it('Deve medir o tempo de carregamento da página inicial', () => {
        const startTime = performance.now(); // Captura o tempo inicial

        cy.visit('URL_DA_PAGINA_INICIAL'); // Substitua pela URL da sua página inicial

        cy.window().then((win) => {
            const endTime = performance.now(); // Captura o tempo final
            const loadTime = endTime - startTime; // Calcula o tempo de carregamento

            // Exibe o tempo de carregamento no console
            cy.log(`Tempo de carregamento: ${loadTime} ms`);

            // Verifica se o tempo de carregamento é menor que 2000 ms (2 segundos)
            expect(loadTime).to.be.lessThan(2000);
        });
    });
});