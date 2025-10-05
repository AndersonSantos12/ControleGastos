using CrontroleGastos.Server.Models;
using CrontroleGastos.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CrontroleGastos.Controllers
{
    [ApiController]
    //Define o endpoint base para acessar este controlador: /api/transaction
    [Route("api/[controller]")]

    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;
        private readonly PersonService _personService;

        //Construtor do controlador - injeta os serviços necessários
        public TransactionController(TransactionService transactionService, PersonService personService)
        {
            _transactionService = transactionService;
            _personService = personService;
        }

        //Rota para obter todas as transações cadastradas no sistema
        [HttpGet]
        public IActionResult GetAllTransactions(){
            var transactions = _transactionService.GetAllTransactions();
            return Ok(transactions); //Lista de transações cadastradas
        }

        //Rota para cadastrar uma nova transação no sistema
        [HttpPost]
        public IActionResult AddTransaction([FromBody] Transaction transaction)
        {
            //Verifica se a pessoa associada à transação existe
            var person = _personService.GetAllPeople().FirstOrDefault(p => p.Id == transaction.PersonId);
            if (person == null)
            {
                return NotFound("Pessoa não encontrada.");
            }

            //Impede menores de idade de registrar receitas
            if (person.Age < 18 && transaction.Type.ToLower() != "despesa")
            {
                return BadRequest("Menores de idade só podem registrar despesas.");
            }

            //Validação para garantir que o valor da transação seja positivo
            if (transaction.Value <= 0)
            {
                return BadRequest("O valor dever ser positivo");
            }

            //Adiciona a transação ao sistema
            var newTransaction = _transactionService.AddTransaction(
                transaction.Description,
                transaction.Value,
                transaction.Type,
                person.Id
            );
            //Retorna a transação cadastrada com sucesso
            return CreatedAtAction(nameof(GetAllTransactions), new { id = newTransaction.Id }, newTransaction);

        }
    }
}
