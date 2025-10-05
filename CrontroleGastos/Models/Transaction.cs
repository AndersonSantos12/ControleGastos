namespace CrontroleGastos.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; } //Identificador único (gerado automaticamente)
        public string Description { get; set; } = string.Empty; //Descrição da transação
        public decimal Value { get; set; } //Valor da transação (deve ser positivo)
        public string Type { get; set; } = "despesa";  //Tipo da transação ("receita" ou "despesa")
        public int PersonId { get; set; } //ID da pessoa associada à transação
    }
}
