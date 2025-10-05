import { useEffect, useState } from 'react';
import api from '../services/api';

//Interface para representar uma pessoa cadasttrada no sistema
interface Person {
    id: number;
    name: string;
}

//Interface para representar uma transação
interface Transaction {
    id: number;
    description: string;
    value: number;
    type: string; //"receita" ou "despesa"
    personId: number;
}

//Interface para armazenar o extrato do resumo financeiro de cada pessoa
interface SummaryData {
    personId: number;
    personName: string;
    totalIncome: number; //Total de receitas
    totalExpense: number; //Total de despesas
    balance: number; //Saldo (receitas - despesas)
}

/**
 * Exibe um resumo dos gastos por pessoa
 * Atualiza automaticamente quando novas pessoas ou transações são adicionadas
 * 
 * @param updatePeople - Atualiza a lista quando uma nova pessoa é cadastrada
 * @param updateTransactions - Atualiza a lista quando uma nova transação é cadastrada
 */
const Summary = ({ updatePeople, updateTransactions }: { updatePeople: boolean; updateTransactions: boolean }) => {
    const [people, setPeople] = useState<Person[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryData[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    //Busca pessoas e transações ao carraegar componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                //Faz a chamada a API para buscar os dados
                const [peopleReponse, transactionsReponse] = await Promise.all([
                    api.get<Person[]>('/person'),
                    api.get<Transaction[]>('/transaction'),
                ]);
                setPeople(peopleReponse.data);
                setTransactions(transactionsReponse.data);

                //Calcula o resumo dos dados retornados
                calculateSummary(peopleReponse.data, transactionsReponse.data);
            } catch (error) {
                console.error('Failed to search for data:', error);
                alert("Erro ao carregar o resumo.");
            }
        };

        fetchData();
    }, [updatePeople, updateTransactions]); //Atualiza sempre que uma nova pessoa ou transação for adicionada

    /**
     * Função para calcular o extrato das receitas e despesas de cada pessoa
     * 
     * @param peopleList - Lista de pessoas cadastradas
     * @param transactionList - Lista de transações registradas
     */
    const calculateSummary = (peopleList: Person[], transactionList: Transaction[]) => {
        const summaryData: SummaryData[] = [];

        let totalIncomeGlobal = 0;
        let totalExpenseGlobal = 0;

        peopleList.forEach(person => {
            //Filtra as transações dessa pessoa
            const personTransactions = transactionList.filter(t => t.personId === person.id);

            //Calcula os dados totais das receitas
            const totalIncome = personTransactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.value, 0);

            //Calcula os dados totais das despesas
            const totalExpense = personTransactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.value, 0);

            //Adiciona ao resumo
            summaryData.push({
                personId: person.id,
                personName: person.name,
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
            });

            //Totais gerais
            totalIncomeGlobal += totalIncome;
            totalExpenseGlobal += totalExpense;
        });

        //Atualiza os estatos com os valores calculados
        setSummary(summaryData);
        setTotalIncome(totalIncomeGlobal);
        setTotalExpense(totalExpenseGlobal);
        setTotalBalance(totalIncomeGlobal - totalExpenseGlobal);
    };

    return (
        <div>
            <h2>Resumo de Gastos por Pessoa</h2>
            <p>Total de pessoas cadastradas: {people.length}</p>
            <p>Total de transações registradas: {transactions.length}</p>
            {summary.length === 0 ? (
                <p>Nenhuma transação registrada.</p>
            ) : (
                <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Receitas (R$)</th>
                            <th>Despesas (R$)</th>
                            <th>Saldo (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.map((item) => (
                            <tr key={item.personId}>
                                <td>{item.personName}</td>
                                <td style={{ color: 'green' }}>{item.totalIncome.toFixed(2)}</td>
                                <td style={{ color: 'red' }}>{item.totalExpense.toFixed(2)}</td>
                                <td>{item.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Geral</th>
                            <th style={{ color: 'green' }}>{totalIncome.toFixed(2)}</th>
                            <th style={{ color: 'red' }}>{totalExpense.toFixed(2)}</th>
                            <th>{totalBalance.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Summary;