using CrontroleGastos.Server.Models;
using System.Runtime.ConstrainedExecution;

namespace CrontroleGastos.Server.Services
{
    public class PersonService
    {
        //Lista de pessoas armazenadas em memória
        private readonly List<Person> _people = new();
        //ID sequêncial para novos cadastros
        private int _nextId = 1;

        //Adiciona uma nova pessoa à lista
        public Person AddPerson(string name, int age)
        {
            var person = new Person
            {
                Id = _nextId++, //Gera um novo ID automaticamente
                Name = name, //Nome da pessoa
                Age = age //Idade da pessoa
            };

            _people.Add(person);
            return person; //Retorna o objeto da pessoa cadastrada
        }

        //Lista todas as pessoas cadastradas
        public List<Person> GetAllPeople()
        {
            return _people; //Retorna a lista de objetos 'Person'
        }

        //Exclusão de uma pessoa pelo ID
        public bool DeletePerson(int id)
        {
            var person = _people.FirstOrDefault(p => p.Id == id); //ID da pessoa a ser removida
            if (person == null) return false; //Retorna `true` se a pessoa foi encontrada e removida, `false` caso contrário

            _people.Remove(person);
            return true;
        }
    }
}
