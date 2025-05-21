import java.util.ArrayList;
import java.util.List;

public class SistemaLoja {

    private List<Produto> produtos = new ArrayList<>();
    private List<Cliente> clientes = new ArrayList<>();

    // Responsável por gerenciar produtos
    public void adicionarProduto(String nome, double preco) {
        produtos.add(new Produto(nome, preco));
    }

    public void listarProdutos() {
        for (Produto produto : produtos) {
            System.out.println(produto.getNome() + " - R$" + produto.getPreco());
        }
    }

    // Responsável por gerenciar clientes
    public void adicionarCliente(String nome, String email) {
        clientes.add(new Cliente(nome, email));
    }

    public void listarClientes() {
        for (Cliente cliente : clientes) {
            System.out.println(cliente.getNome() + " - " + cliente.getEmail());
        }
    }

    // Responsável por processar vendas
    public void realizarVenda(String nomeCliente, String nomeProduto) {
        Cliente cliente = buscarClientePorNome(nomeCliente);
        Produto produto = buscarProdutoPorNome(nomeProduto);

        if (cliente != null && produto != null) {
            System.out.println("Venda realizada: " + produto.getNome() + " para " + cliente.getNome());
        } else {
            System.out.println("Cliente ou produto não encontrado.");
        }
    }

    private Cliente buscarClientePorNome(String nome) {
        for (Cliente c : clientes) {
            if (c.getNome().equals(nome)) return c;
        }
        return null;
    }

    private Produto buscarProdutoPorNome(String nome) {
        for (Produto p : produtos) {
            if (p.getNome().equals(nome)) return p;
        }
        return null;
    }
}
