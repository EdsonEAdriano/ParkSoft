public class Pessoa
{
    // Propriedades
    public string Nome { get; private set; }
    public int Idade { get; private set; }

    // Construtor
    public Pessoa(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome))
            throw new ArgumentException("Nome não pode ser vazio", nameof(nome));
        if (idade < 0)
            throw new ArgumentException("Idade não pode ser negativa", nameof(idade));

        Nome = nome;
        Idade = idade;
    }

    // Método para exibir as informações da pessoa
    public string ExibirInformacoes()
    {
        return $"Nome: {Nome}, Idade: {Idade}";
    }
}
