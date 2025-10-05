import { useState } from 'react';
import PeopleList from './components/PeopleList';
import Summary from './components/Summary';
import TransactionList from './components/TransactionList';
import AddPerson from './pages/AddPerson';
import AddTransaction from './pages/AddTransactions';

/**
 * Componente principal do sistema de Controle de Gastos Residenciais.
 * 
 * Gerencia a atualização automática da lista de pessoas, transações e o resumo de gastos.
 */
function App() {
    //Estato para atualizar a lista de pessoas ao adicionar ou excluir uma pessoa
    const [updatePeople, setUpdatePeople] = useState(false);
    // Estado para atualizar a lista de transações ao adicionar uma nova transação
    const [updateTransactions, setUpdateTransactions] = useState(false);


    //Função que altera o estado 'updatePeople' para atualizar a lista de pessoas
    const refreshPeopleList = () => {
        setUpdatePeople(prev => !prev);
    };

    //Função que altera o estado 'updateTransactions' para atualizar a lista de transações
    const refreshTransactionList = () => {
        setUpdateTransactions(prev => !prev);
    };

    return (
        <div className="container">
            <h1 className="title">Controle de Gastos Residenciais</h1>

            {/* Formulários de cadastro */}
            <div className="forms">
                <div className="form-box">
                    {/* Formulário para adicionar nova pessoa */}
                    <AddPerson onPersonAdded={refreshPeopleList} />   
                </div>
                <div className="form-box">
                    {/* Formulário para adicionar nova transação */}
                    <AddTransaction onTransactionAdded={refreshTransactionList} updatePeople={updatePeople} />
                </div>
            </div>

            {/* Listagem de Pessoas, Transações e Resumo */}
            <div className="content">
                {/* Lista de pessoas cadastradas */}
                <PeopleList update={updatePeople} />
                {/* Lista de transações cadastradas */}
                <TransactionList update={updateTransactions} />
                {/* Resumo de gastos (atualizado automaticamente) */}
                <Summary updatePeople={updatePeople} updateTransactions={updateTransactions} />
            </div> 
        </div>
    );
}

export default App;