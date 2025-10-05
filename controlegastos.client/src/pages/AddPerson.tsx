import { useState } from 'react';
import api from '../services/api';

// Interface pra definir o modelo dos dados da pessoa
interface Person {
    name: string;
    age: number;
}

/**
 * Adiciona uma nova pessoa ao sistema
 * 
 * @param onPersonAdded - Função chamada após o cadastro bem-sucedido para atualizar a lista de pessoas
 */
const AddPerson = ({ onPersonAdded }: { onPersonAdded: () => void }) => {
    // Estado para armazenar os dados do formulário(Nome e Idade)
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');

    /**
    * Função para lidar com o envio do formulário de cadastro de pessoa
    * Valida os campos antes de enviar os dados para a API
    * 
    * @param e - Evento de submit do formulário
    */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Validação para garantir que os campos não estão vazios
        if (!name || !age) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const newPerson: Person = { name, age: Number(age) };

        try {
            //Envia a solicitação para a API para cadastrar a nova pessoa
            await api.post('/person', newPerson);
            alert("Pessoa adicionada com sucesso!");

            //Limpa os campos do formulário após o envio bem-sucedido
            setName('');
            setAge('');

            //Chama a função para atualizar a lista de pessoas na interface
            onPersonAdded();
        } catch (error) {
            console.error('Failed to add person', error);
            alert("Erro ao adicionar pessoa!");
        }
    };

    return (
        <div>
            <h2>Adicionar Nova Pessoa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome"
                    />
                </div>
                <div>
                    <label>Idade:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Digite a idade"
                    />
                </div>
                <button type="submit">Adicionar Pessoa</button>
            </form>
        </div>
    );
};

export default AddPerson;