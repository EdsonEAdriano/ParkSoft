// Entidade
public class Pedido
{
    public int Id { get; set; }
    public Cliente Cliente { get; set; }
    public List<ItemPedido> Itens { get; set; } = new();
    
    public decimal CalcularTotal()
    {
        return Itens.Sum(item => item.CalcularSubtotal());
    }
}

// Entidade
public class Cliente
{
    public string Nome { get; set; }
    public string Email { get; set; }

    public Cliente(string nome, string email)
    {
        Nome = nome;
        Email = email;
    }
}

// Entidade
public class ItemPedido
{
    public string Produto { get; set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }

    public decimal CalcularSubtotal()
    {
        return Quantidade * PrecoUnitario;
    }
}

// Serviço
public class PedidoService
{
    public void ProcessarPedido(Pedido pedido)
    {
        var total = pedido.CalcularTotal();
        Console.WriteLine($"Pedido para {pedido.Cliente.Nome} - Total: R$ {total:F2}");
        EnviarEmailConfirmacao(pedido.Cliente.Email);
    }

    private void EnviarEmailConfirmacao(string email)
    {
        Console.WriteLine($"E-mail de confirmação enviado para: {email}");
    }
}
