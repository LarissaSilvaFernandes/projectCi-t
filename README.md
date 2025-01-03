# Projeto de Comentários - Challenge 7 (Programa de Estágio CI&T 2024 | Next Gen AI Edition)

Este projeto foi desenvolvido como parte do processo seletivo para o programa de estágio CI&T Next Gen AI Edition. Ele consiste em uma API desenvolvida em Node.js usando o framework Express, com o objetivo de listar comentários em formato de árvore para posts específicos.

## Descrição do Projeto

A aplicação conecta-se a um banco de dados PostgreSQL e permite a consulta de comentários associados a posts. Os comentários são retornados em uma estrutura hierárquica, onde cada comentário pode ter subcomentários. O objetivo é organizar e apresentar esses comentários de forma encadeada para facilitar a visualização das respostas dentro de cada post.

## Estrutura de Dados

- **Post**: contém o conteúdo do post.
- **Comment**: contém o conteúdo do comentário, podendo referenciar um comentário pai para criar a estrutura de árvore.

## Funcionalidades

- **Consulta de Comentários**: Retorna todos os comentários associados a um post específico em formato JSON.
- **Estrutura Hierárquica**: A estrutura dos comentários é apresentada em árvore, onde subcomentários são organizados como filhos dos comentários aos quais respondem.

## Tecnologias Utilizadas

- **Node.js** com **Express** para o servidor
- **Sequelize** para ORM com PostgreSQL
- **PostgreSQL** como banco de dados

## Como Executar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/larissafernandes-dev/comentarios-ciandt-challenge7.git
   cd comentarios-ciandt-challenge7
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o Banco de Dados**:

   Atualize o arquivo `migration.js` com a senha correta do PostgreSQL:

   ```javascript
   const sequelize = new Sequelize('comments', 'postgres', 'SUA_SENHA', {
     dialect: 'postgres',
     host: 'localhost',
     port: 5432,
   });
   ```

4. **Inicialize o Banco de Dados**:

   Execute o seguinte comando para sincronizar o banco de dados e popular com dados de teste:

   ```bash
   node index.js
   ```

5. **Inicie o Servidor**:

   ```bash
   node index.js
   ```

6. **Consultar os Comentários**:

   Com o servidor em execução, use um cliente HTTP como o Postman para acessar a rota:

   ```http
   GET http://localhost:3000/posts/{postId}/comments
   ```

   Substitua `{postId}` pelo ID do post desejado para retornar os comentários associados.

---

Qualquer dúvida ou problema, sinta-se à vontade para entrar em contato! 
Desenvolvido por:
Larissa Fernandes
