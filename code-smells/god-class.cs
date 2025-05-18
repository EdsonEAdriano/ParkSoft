using System;
using System.Collections.Generic;

public class SistemaGestaoPedidos
{
    private List<string> produtosDisponiveis = new List<string> { "Notebook", "Smartphone", "Tablet" };

    // Responsável pelo cadastro de produto
    public void CadastrarProduto(string nome, double preco)
    {
        Console.WriteLine($"Produto {nome} com preço R${preco} cadastrado.");
    }

    // Responsável por criar o pedido
    public void ProcessarPedido(int pedidoId, string produto, int quantidade, string clienteEmail)
    {
        if (!produtosDisponiveis.Contains(produto))
        {
            Console.WriteLine("Produto não disponível.");
            return;
        }

        // Calcula o preço do pedido
        double precoTotal = CalcularPrecoTotal(produto, quantidade);
        Console.WriteLine($"Pedido {pedidoId} para {quantidade} {produto}(s) no valor total de R${precoTotal}.");

        // Realiza pagamento
        EfetuarPagamento(precoTotal);

        // Atualiza o estoque
        AtualizarEstoque(produto, quantidade);

        // Envia e-mail de confirmação
        EnviarEmailNotificacao(clienteEmail, pedidoId);

        // Gera relatório
        GerarRelatorioPedido(pedidoId, precoTotal);
    }

    // Responsável pelo cálculo de preços
    private double CalcularPrecoTotal(string produto, int quantidade)
    {
        double precoUnitario = 0;

        switch (produto)
        {
            case "Notebook":
                precoUnitario = 2500.00;
                break;
            case "Smartphone":
                precoUnitario = 1500.00;
                break;
            case "Tablet":
                precoUnitario = 800.00;
                break;
            default:
                Console.WriteLine("Produto desconhecido.");
                break;
        }

        return precoUnitario * quantidade;
    }

    // Responsável pelo pagamento
    private void EfetuarPagamento(double valor)
    {
        Console.WriteLine($"Pagamento de R${valor} efetuado.");
    }

    // Responsável pela atualização de estoque
    private void AtualizarEstoque(string produto, int quantidade)
    {
        Console.WriteLine($"Estoque do produto {produto} atualizado. {quantidade} unidades retiradas.");
    }

    // Responsável pelo envio de notificações
    private void EnviarEmailNotificacao(string email, int pedidoId)
    {
        Console.WriteLine($"E-mail enviado para {email}: Pedido {pedidoId} confirmado.");
    }

    // Responsável pela geração de relatórios de pedidos
    private void GerarRelatorioPedido(int pedidoId, double valor)
    {
        Console.WriteLine($"Relatório gerado para o pedido {pedidoId}: Valor total R${valor}");
    }
}
