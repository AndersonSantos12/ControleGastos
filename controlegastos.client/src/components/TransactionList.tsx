import { useEffect, useState } from 'react';
import api from '../services/api';

//Interface para representar os dados de uma transação
interface Transaction {
    id: number;
    description: string;
    value: number;
    type: string; //"receita" ou "despesa"
    personId: number;
}

//Definição do modelo da pessoa (exibição dos nomes)
interface Person {
    id: number;
    name: string;
}

/**
 * Exibe a lista de transações cadastradas no sistema
 * Atualiza automaticamente quando novas transações são adicionadas
 * 
 * @param update - Atualiza a lista de transações automaticamente
 */
const TransactionList = ({ update } : { update: boolean }) => {
    //Estado para armazenar as transações cadastradas
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [people, setPeople] = useState<Person[]>([]);

    //Função para buscar as transações e pessoas na API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transactionsResponse, peopleResponse] = await Promise.all([
                    api.get<Transaction[]>('/transaction'),
                    api.get<Person[]>('/person'),
                ]);

                setTransactions(transactionsResponse.data);
                setPeople(peopleResponse.data);
            } catch (error) {
                console.error('Failed to search for transactions:', error);
                alert('Errro ao carregar transações!');
            }
        };

        fetchData();
    }, [update]); //Atualiza automaticamente quando 'update' mudar

    /**
     * Função para encontrar o nome da pessoa associada à transação.
     * 
     * @param personId - ID da pessoa associada à transação
     * @returns - Retorna o Nome da Pessoa ou "Desconhecido", se não for encontrada
     */
    const getPersonName = (personId: number) => {
        const person = people.find(p => p.id === personId);
        return person ? person.name : 'Desconhecido';
    };

    return (
        <div>
            <h2>Lista de Transações</h2>
            {transactions.length === 0 ? (
                <p>Nenhuma transação registrada.</p>
            ) : (
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor (R$)</th>
                        <th>Tipo</th>
                        <th>Pessoa</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.description}</td>
                            <td>R$ {transaction.value.toFixed(2)}</td>
                            <td className={transaction.type === 'receita' ? 'receita' : 'despesa'}>
                                {transaction.type}
                            </td>
                            <td>{getPersonName(transaction.personId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default TransactionList;
