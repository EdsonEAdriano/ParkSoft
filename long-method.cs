public void ProcessCustomerOrder(int customerId, List<int> productIds)
{
    // 1. Validar cliente
    var customer = GetCustomerById(customerId);
    if (customer == null)
    {
        Console.WriteLine("Cliente não encontrado.");
        return;
    }

    if (!customer.IsActive)
    {
        Console.WriteLine("Cliente inativo.");
        return;
    }

    // 2. Validar produtos
    var validProducts = new List<Product>();
    foreach (var productId in productIds)
    {
        var product = GetProductById(productId);
        if (product == null)
        {
            Console.WriteLine($"Produto {productId} não encontrado.");
            continue;
        }

        if (product.Stock <= 0)
        {
            Console.WriteLine($"Produto {product.Name} sem estoque.");
            continue;
        }

        validProducts.Add(product);
    }

    if (!validProducts.Any())
    {
        Console.WriteLine("Nenhum produto válido para processar.");
        return;
    }

    // 3. Calcular total e aplicar desconto
    decimal total = 0;
    foreach (var product in validProducts)
    {
        total += product.Price;
    }

    decimal discount = 0;
    if (customer.IsPremium)
    {
        discount = total * 0.10m;
        total -= discount;
    }

    // 4. Criar pedido
    var order = new Order
    {
        CustomerId = customer.Id,
        OrderDate = DateTime.Now,
        Total = total,
        Discount = discount,
        Items = validProducts.Select(p => new OrderItem
        {
            ProductId = p.Id,
            Quantity = 1,
            Price = p.Price
        }).ToList()
    };

    SaveOrder(order);

    // 5. Atualizar estoque
    foreach (var item in order.Items)
    {
        var product = GetProductById(item.ProductId);
        if (product != null)
        {
            product.Stock -= item.Quantity;
            UpdateProductStock(product);
        }
    }

    Console.WriteLine($"Pedido do cliente {customer.Name} processado com sucesso. Total: {total:C2}");
}
