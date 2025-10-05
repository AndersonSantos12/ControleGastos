import { useEffect, useState } from 'react';
import api from '../services/api';

//Interface para representar os dados de uma pessoa cadastrada
interface Person {
    id: number;
    name: string;
    age: number;
}

/**
 * Componente que exibe a lista de pessoas cadastradas no sistema.
 * Permite listar e excluir pessoas e oferece a atulização automática.
 * 
 * @param update - atualiza a lista de pessoas quando há mudanças.
 */
const PeopleList = ({ update }: { update: boolean }) => {
    //Estado para armazenar a lista de pessoas cadastradas
    const [people, setPeople] = useState<Person[]>([]);

    //Estado para armazenar possíveis erros na busca de pessoas
    const [error, setError] = useState<string | null>(null);

    /**
     * Função para buscar a lista de pessoas na API
     * Sempre que há uma atualização em 'update', a lista será atualizada automaticamente
     */
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await api.get<Person[]>('/person'); // Chama a API
                setPeople(response.data); // Atualiza o estado com os dados recebidos
            } catch (error) {
                console.error('Failed to search for person:', error);
                setError('Erro ao carregar a lista de pessoas.');
            }
        };

        fetchPeople();
    }, [update]); //Atualiza automaticamente quando 'update' mudar

    /**
     * Função para deletar uma pessoa cadastrada
     * Antes de excluir, exibe uma confirmação para o usuário.
     * Após a exclusão, atualiza a lista localmente.
     * 
     * @param id - ID da pessoa a ser removida
     */
    const deletePerson = async (id: number) => {
        //Confirmação antes da exclusão
        if (!window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
            return; //Se o usuário cancelar, não conclui a ação de exclusão
        }

        try {
            await api.delete(`/person/${id}`); //Chama a API para deletar a pessoa
            setPeople(people.filter(person => person.id !== id)); //Atualiza a lista(sem a pessoa que foi removida)
            alert("Pessoa excluida com sucesso!");
        } catch (error) {
            console.error('Failed to delete person:', error);
            alert("Erro ao excluir a pessoa!");
        }
    };

    return (
        <div>
            <h2>Lista de Pessoas</h2>

            {/* Exibe um erro caso a API não consiga carregar os dados */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {people.length === 0 ? (
                <p>Nenhuma pessoa cadastrada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(person => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>{person.age} anos</td>
                                <td>
                                    <button onClick={() => deletePerson(person.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PeopleList;
