class PedidoProcessor
  def processar(pedido)
    puts "Iniciando processamento do pedido ##{pedido[:id]}"
    
    # Verifica estoque
    pedido[:itens].each do |item|
      produto = encontrar_produto(item[:produto_id])
      if produto[:estoque] < item[:quantidade]
        puts "Estoque insuficiente para o produto #{produto[:nome]}"
        return
      end
    end

    # Calcula total
    total = 0
    pedido[:itens].each do |item|
      produto = encontrar_produto(item[:produto_id])
      subtotal = item[:quantidade] * produto[:preco]
      total += subtotal
    end

    # Aplica desconto
    if pedido[:cliente][:vip]
      total *= 0.9
    end

    # Gera fatura
    puts "Total do pedido: R$ #{total}"
    puts "Enviando fatura para o cliente #{pedido[:cliente][:email]}"

    # Atualiza estoque
    pedido[:itens].each do |item|
      produto = encontrar_produto(item[:produto_id])
      produto[:estoque] -= item[:quantidade]
    end

    puts "Pedido processado com sucesso!"
  end

  def encontrar_produto(id)
    # Simulação de base de dados em memória
    {
      1 => { nome: "Mouse", preco: 100.0, estoque: 10 },
      2 => { nome: "Teclado", preco: 150.0, estoque: 5 }
    }[id]
  end
end
