# Controle de Gastos Residenciais

Este projeto é um **sistema de controle de gastos residenciais** desenvolvido com **.NET (C#) para o back-end** e **React com TypeScript para o front-end**. 
Ele permite **cadastrar pessoas e transações financeiras**, além de exibir um **resumo das receitas e despesas**.


## 📌 **Funcionalidades**

✅ **Cadastro de Pessoas**  
- Criar, listar e excluir pessoas.  
- Deletar todas as transações associadas ao excluir uma pessoa.  

✅ **Cadastro de Transações**  
- Criar e listar transações associadas a uma pessoa cadastrada.  
- Apenas **despesas** podem ser registradas por **menores de 18 anos**.  
- Apenas valores **positivos** são aceitos.  

✅ **Resumo de Gastos**  
- Lista todas as pessoas cadastradas com total de **receitas, despesas e saldo**.  
- Exibe **o total geral** de todas as pessoas.  
- **Ignora transações com valor `0`** para uma exibição mais precisa.  

✅ **Atualização Automática**  
- A **lista de pessoas e transações** é atualizada automaticamente.  
- **O dropdown de seleção de pessoa é atualizado** ao adicionar um novo cadastro.  
- **O resumo de gastos é recalculado em tempo real**.  

---

## 🛠️ **Tecnologias Utilizadas**

### **Back-end** 🖥️  
🔹 **.NET 8 (C#)**  
🔹 **ASP.NET Core Web API**  
🔹 **Sistema baseado em memória (sem banco de dados)**  

### **Front-end** 💻  
🔹 **React com TypeScript**  
🔹 **Vite**  
🔹 **Axios** (para consumo da API)  
🔹 **CSS puro** 

---

## 🚀 **Como Rodar o Sistema?**  

### 📌 **Pré-requisitos**
- **Back-end**: .NET 8
- **Front-end**: Node.js 
- **Editor de Código**: Visual Studio (para .NET) e VS Code ou outro para React  

---

### 1️⃣ **Baixar e Extrair o Projeto**
1. Faça o download do arquivo `.zip` enviado.  
2. Extraia o conteúdo para um diretório de sua preferência.  
3. Abra o terminal (`cmd`, PowerShell ou outro) e navegue até a pasta extraída.

---

### 2️⃣ **Rodar o Back-end**
1. Abra o **Visual Studio** e carregue a solução `.sln`.  
2. No terminal, vá até a **pasta do servidor**:  
   cd ControleGastosResidenciais.Server
3. Inicie o **servidor do back-end**:
   dotnet run
   A API estará rodando em http://localhost:5006.

---

### 3️⃣ **Rodar o Front-end**
1. Abra um **novo terminal** e vá até a pasta do front-end:
   cd controlegastosresidenciais.cliente
2. Instale as **dependências do projeto**:
   npm install
3. Inicie o servidor do front-end:
   npm run dev
