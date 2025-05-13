using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace GodClassSample
{
    // ⚠️ Exemplo de GOD CLASS – não copie para produção!
    public class OrderManager
    {
        // -------------------- Dados em memória --------------------
        private readonly List<Order> _orders = new();
        private readonly HttpClient _http = new();

        // -------------------- Operações CRUD ----------------------
        public void AddOrder(Order order) => _orders.Add(order);

        public Order? GetOrderById(int id) => _orders.Find(o => o.Id == id);

        public void UpdateOrder(Order order)
        {
            var existing = GetOrderById(order.Id);
            if (existing == null) throw new InvalidOperationException("Pedido inexistente");
            existing.CopyFrom(order);
        }

        public void RemoveOrder(int id) => _orders.RemoveAll(o => o.Id == id);

        // -------------------- Regras de negócio -------------------
        public decimal CalculateTotal(Order order)
        {
            decimal total = 0;
            foreach (var item in order.Items)
                total += item.UnitPrice * item.Quantity;

            if (order.Client.IsVip)
                total *= 0.9m; // 10 % de desconto para VIP

            return total;
        }

        public bool Validate(Order order)
        {
            if (order.Client == null || order.Items.Count == 0)
                return false;
            if (order.Date < DateTime.Today.AddYears(-1))
                return false;
            return true;
        }

        // -------------------- Persistência (DB) -------------------
        public void SaveAllToDatabase(string connectionString)
        {
            using var conn = new SqlConnection(connectionString);
            conn.Open();
            foreach (var order in _orders)
            {
                var cmd = conn.CreateCommand();
                cmd.CommandText = "INSERT INTO Orders(Id, ClientId, Date, Total) VALUES(@id,@client,@date,@total)";
                cmd.Parameters.AddWithValue("@id", order.Id);
                cmd.Parameters.AddWithValue("@client", order.Client.Id);
                cmd.Parameters.AddWithValue("@date", order.Date);
                cmd.Parameters.AddWithValue("@total", CalculateTotal(order));
                cmd.ExecuteNonQuery();
            }
        }

        public void LoadAllFromDatabase(string connectionString)
        {
            _orders.Clear();
            using var conn = new SqlConnection(connectionString);
            conn.Open();
            var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT * FROM Orders";
            using var rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                _orders.Add(new Order
                {
                    Id    = rdr.GetInt32(0),
                    Date  = rdr.GetDateTime(2),
                    // …carrega resto dos campos
                });
            }
        }

        // -------------------- Exportação / Relatórios -------------
        public string ExportCsv()
        {
            var sb = new StringBuilder("Id;Date;Total\n");
            foreach (var order in _orders)
                sb.AppendLine($"{order.Id};{order.Date:yyyy-MM-dd};{CalculateTotal(order)}");
            return sb.ToString();
        }

        public void SaveCsvToFile(string path) => File.WriteAllText(path, ExportCsv());

        // -------------------- Integração externa ------------------
        public void SendToExternalApi(string apiUrl)
        {
            foreach (var order in _orders)
            {
                var json = JsonSerializer.Serialize(order);
                var resp = _http.PostAsync(apiUrl, new StringContent(json, Encoding.UTF8, "application/json")).Result;
                if (!resp.IsSuccessStatusCode)
                    Console.WriteLine($"Falha ao enviar pedido {order.Id}: {resp.StatusCode}");
            }
        }

        // -------------------- “UI” (Console) ----------------------
        public void PrintSummaryToConsole()
        {
            Console.WriteLine("=== RESUMO DE PEDIDOS ===");
            foreach (var order in _orders)
                Console.WriteLine($"{order.Id} | {order.Date:dd/MM/yyyy} | Total: {CalculateTotal(order):C}");
        }
    }

    // ---------- Modelos simplificados usados pelo exemplo ---------
    public class Order
    {
        public int Id { get; set; }
        public Client Client { get; set; } = default!;
        public DateTime Date { get; set; } = DateTime.Today;
        public List<OrderItem> Items { get; set; } = new();

        public void CopyFrom(Order other)
        {
            Client = other.Client;
            Date   = other.Date;
            Items.Clear();
            Items.AddRange(other.Items);
        }
    }

    public class OrderItem
    {
        public string Description { get; set; } = "";
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class Client
    {
        public int Id { get; set; }
        public bool IsVip { get; set; }
    }
}
