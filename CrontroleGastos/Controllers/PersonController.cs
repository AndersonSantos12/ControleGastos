using CrontroleGastos.Server.Models;
using CrontroleGastos.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CrontroleGastos.Server.Controllers
{
    [ApiController]

    //Define o endpoint base para acessar este controlador: /api/person
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly PersonService _personService;
        private readonly TransactionService _transactionService;

        //Construtor do controlador - injeta os serviços necessários
        public PersonController(PersonService personService, TransactionService transactionService)
        {
            _personService = personService;
            _transactionService = transactionService;
        }

        //Rota para listar todas as pessoas no sistema
        [HttpGet]
        public IActionResult GetAllPeople()
        {
            var people = _personService.GetAllPeople();
            return Ok(people);
        }

        //Rota para cadastrar uma nova pessoa no sistema
        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            //Valida se o nome foi informado e se a idade é maior que zero
            if (string.IsNullOrEmpty(person.Name) || person.Age <= 0)
            {
                return BadRequest("Nome e idade são obrigatórios!");
            }

            var newPerson = _personService.AddPerson(person.Name, person.Age);
            return CreatedAtAction(nameof(GetAllPeople), new { id = newPerson.Id }, newPerson);
        }

        //Rota para deletar uma pessoa e suas transações associadas
        [HttpDelete("{id}")]
        //Exclui uma pessoa pelo ID e remove todas as transações associadas
        public IActionResult DeletePerson(int id)
        {
            //Verifica se a pessoa existe antes de excluir
            var personExists = _personService.DeletePerson(id);
            if (!personExists)
            {
                return NotFound("Pessoa não encontrada.");
            }

            //Remove todas as transações associadas à pessoa excluída
            _transactionService.DeleteTransactionsByPerson(id);
            return NoContent();
        }
    }
}
