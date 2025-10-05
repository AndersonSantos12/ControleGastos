using CrontroleGastos.Server.Models;
using CrontroleGastos.Server.Services;
using Microsoft.AspNetCore.Mvc;


namespace CrontroleGastos.Controllers
{
    [ApiController]
    //Define o endpoint base para acessar este controlador: /api/summary
    [Route("api/[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly PersonService _personService;
        private readonly TransactionService _transactionService;

        //Construtor do controlador - injeta os serviços necessário
        public SummaryController(PersonService personService, TransactionService transactionService)
        {
            _personService = personService;
            _transactionService = transactionService;
        }

        // Rota para obter um resumo financeiro de todas as pessoas cadastradas (receitas, despesas, saldo)
        [HttpGet("totals")]
        public IActionResult GetTotals()
        {
            var people = _personService.GetAllPeople(); //Obtém todas as pessoas cadastradas
            var report = new List<object>(); //Lista para armazenar os resumos individuais

            decimal totalReceitas = 0;
            decimal totalDespesas = 0;

            //Percorre todas as pessoas cadastradas para calcular seus totais financeiros
            foreach (var person in people)
            {
                var transactions = _transactionService.GetTransactionsByPerson(person.Id);

                //Soma todas as receitas da pessoa
                decimal receitas = transactions
                    .Where(t => t.Type.ToLower() == "receita")
                    .Sum(t => t.Value);

                //Soma todas as despesas da pessoa
                decimal despesas = transactions
                    .Where(t => t.Type.ToLower() == "despesa")
                    .Sum(t => t.Value);

                //Calcula o saldo da pessoa (receitas - despesas)
                decimal saldo = receitas - despesas;

                //Adiciona os dados da pessoa ao relatório
                report.Add(new
                {
                    person.Id,
                    person.Name,
                    person.Age,
                    Receitas = receitas,
                    Despesas = despesas,
                    Saldo = saldo
                });

                //Incrementa os totais gerais
                totalReceitas += receitas;
                totalDespesas += despesas;
            }

            //Calcula o total geral do sistema
            var totalGeral = new
            {
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                SaldoLiquido = totalReceitas - totalDespesas
            };

            //Retorna os dados formatados como resposta JSON
            return Ok(new { Pessoas = report, TotalGeral = totalGeral });
        }
    }
}
