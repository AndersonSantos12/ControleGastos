import { useEffect, useState } from 'react';
import api from '../services/api';

//Interface para representar os dados de uma transação
interface Transaction {
    description: string;
    value: number;
    type: string; //"despesa" ou "receita"
    personId: number;
}

//Interface representar os dados de uma pessoa cadastrada
interface Person {
    id: number;
    name: string;
}

/**
 * Adiciona uma nova transação ao sistema
 * Atualiza automaticamente quando novas pessoas são cadastradas
 * 
 * @param onTransactionAdded - Função chamada após o cadastro bem-sucedido para atualizar a lista de transações
 * @param updatePeople - Atualiza o dropdown de pessoas quando uma nova pessoa é cadastrada
 */
const AddTransaction = ({ onTransactionAdded, updatePeople }: { onTransactionAdded: () => void; updatePeople: boolean }) => {
    //Estado para armazenar a descrição da transação
    const [description, setDescription] = useState('');
    //Estado para armazenar o valor da transação
    const [value, setValue] = useState<number | ''>('');
    //Estado para armazenar o tipo da transação
    const [type, setType] = useState('despesa');
    //Estado para armazenar o ID da pessoa associada à transação
    const [personId, setPersonId] = useState<number | ''>('');
    //Estado para armazenar a lista de pessoas disponíveis no dropdown
    const [people, setPeople] = useState<Person[]>([]);

    //Busca todas as pessoas cadastradas
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await api.get<Person[]>('/person');
                setPeople(response.data);
            } catch (error) {
                console.error('Failed to search for person:', error);
            }
        };

        fetchPeople();
    }, [updatePeople]); //Atualiza automaticamente quando 'updatePeople' mudar

    //Função para enviar a transação para a API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Validação para garantir que os campos não estão vazios
        if (!description || !value || !personId) {
            alert("Preencha todos os campos!");
            return;
        }

        const newTransaction: Transaction = {
            description,
            value: Number(value),
            type,
            personId: Number(personId),
        };

        try {
            //Envia a solicitação para a API para cadastrar a nova transação
            await api.post('/transaction', newTransaction);
            alert("Transação adicionada com sucesso!");

            //Limpa os campos do formulário após o envio bem-sucedido
            setDescription('');
            setValue('');
            setType('despesa');
            setPersonId('');

            //Chama a função para atualizar a lista de transações na interface
            onTransactionAdded();
        } catch (error: any) {
            console.error('Failed to add transaction:', error);

            if (error.response && error.response.data) {
                alert(`ATENÇÃO: ${error.response.data}`);
            } else {
                alert("Erro ao adicionar transação.");
            }
        }
    };

    return (
        <div>
            <h2>Adicionar Transação</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite a descrição"
                    />
                </div>
                <div>
                    <label>Valor:</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Digite o valor"
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="despesa">Despesa</option>
                        <option value="receita">Receita</option>
                    </select>
                </div>
                <div>
                    <label>Pessoa:</label>
                    <select value={personId} onChange={(e) => setPersonId(Number(e.target.value))}>
                        <option value="">Selecione uma pessoa</option>
                        {people.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Adicionar Transação</button>
            </form>
        </div>
    );
};

export default AddTransaction;
