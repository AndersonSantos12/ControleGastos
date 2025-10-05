namespace CrontroleGastos.Server.Models
{
    //Representa uma pessoa cadastrada no sistema
    public class Person
    {
        public int Id { get; set; } //Identificador único (gerado automaticamente)
        public string Name { get; set; } = string.Empty; //Nome da pessoa cadastrada
        public int Age { get; set; } //Idade da pessoa cadastrada
    }
}
