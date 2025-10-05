using CrontroleGastos.Server.Models;

namespace CrontroleGastos.Server.Services
{
    //Serviço responsável pela lógica de negócio do cadastro de transações
    public class TransactionService
    {
        //Lista de transações armazenadas em memória
        private readonly List<Transaction> _transactions = new(); //Lista de transações em memória
        private int _nextId = 1; //ID sequêncial para novas transações

        //Adiciona uma nova transação à lista
        public Transaction AddTransaction(string description, decimal value, string type, int personId)
        {
            var transaction = new Transaction
            {
                Id = _nextId++, //Gera um novo ID automaticamente
                PersonId = personId, //ID da pessoa associada à transação
                Description = description, //Descrição da transação
                Value = value, //Valor da transação
                Type = type.ToLower() //Armazena o tipo sempre em minúsculas
            };

            _transactions.Add(transaction);
            return transaction;
        }


        //Lista todas as transações
        public List<Transaction> GetAllTransactions()
        {
            return _transactions;
        }

        //Lista uma transação específica
        public List<Transaction> GetTransactionsByPerson(int personId)
        {
            return _transactions.Where(t => t.PersonId == personId).ToList();
        }

        //Remove transações de uma pessoa específica - quando a pessoa for deletada
        public void DeleteTransactionsByPerson(int personId)
        {
            _transactions.RemoveAll(t => t.PersonId == personId);
        }

        internal object AddTransaction(string description, string type, int personId)
        {
            throw new NotImplementedException();
        }
    }
}
