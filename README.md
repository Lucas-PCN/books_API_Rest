📚 Books API — Node.js + PostgreSQL

API RESTful desenvolvida em Node.js com Express e PostgreSQL para gerenciamento de livros.
Este projeto faz parte do desafio de Backend do Bolsa Futuro Digital.

🚀 Tecnologias Utilizadas

Node.js

Express.js

PostgreSQL

pg

dotenv

nodemon

📦 Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/books_API_Rest.git
cd books_API_Rest


Instale as dependências:

npm install


Crie o arquivo .env:

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=booksdb
DB_PORT=5432
PORT=3000

🗄️ Banco de Dados

Crie o banco:

CREATE DATABASE booksdb;


Crie a tabela:

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL
);


Execute o seed:

sudo -u postgres psql
\c booksdb
\i seed.sql

▶️ Executar o servidor
npm run dev


Servidor rodando em:

http://localhost:3000

📡 Endpoints
🔹 Listar todos os livros
GET /books

🔹 Buscar por nome
GET /books?name=harry

🔹 Buscar por categoria
GET /books?category=Fantasia

🔹 Buscar livro por ID
GET /books/:id


Resposta (sucesso):

{
  "id": 1,
  "name": "Harry Potter",
  "category": "Fantasia",
  "price": "39.90"
}


Resposta (erro 404):

{
  "error": "Livro não encontrado"
}

🔹 Criar livro
POST /books


Body:

{
  "name": "Senhor dos Anéis",
  "category": "Fantasia",
  "price": 99.90
}

🔹 Atualizar livro (completo)
PUT /books/:id


Body:

{
  "name": "Clean Code",
  "category": "Programação",
  "price": 89.90
}

🔹 Atualizar livro (parcial)
PATCH /books/:id


Exemplo:

{
  "price": 59.90
}

🔹 Deletar livro
DELETE /books/:id


Resposta:

{
  "message": "Livro deletado com sucesso"
}

✅ Funcionalidades

CRUD completo de livros

Filtros por nome e categoria

Validação de erro 404

Banco PostgreSQL

Respostas JSON

Estrutura MVC

👨‍💻 Autor

Lucas Pereira Castanheira Nascimento
Projeto desenvolvido para o Bolsa Futuro Digital
