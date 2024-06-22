# Bazar Node Project

Este é um projeto de um bazar online desenvolvido com Node.js, Express e MongoDB. Ele permite a criação, listagem, atualização e exclusão de produtos, além de gerenciar usuários e seus produtos.

## Sumário

- [Instalação](#instala%C3%A7%C3%A3o)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licen%C3%A7a)

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- [MongoDB](https://www.mongodb.com/) rodando na máquina ou em um servidor

### Passos

1.  Clone o repositório:

`git clone https://github.com/seu-usuario/bazar-node-project.git
cd bazar-node-project`

2.  Instale as dependências:

`npm install`

3.  Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias. Exemplo:

env

`PORT=3000
MONGODB_URI=mongodb://localhost:27017/bazar
JWT_SECRET=sua_chave_secreta`

4.  Inicie o servidor:

`npm start`

O servidor deve iniciar na porta definida no arquivo `.env` (ou 3000 por padrão).

## Uso

Após iniciar o servidor, você pode usar um cliente HTTP como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints da API.

## Endpoints

### Usuários

- **POST /users/register**: Registra um novo usuário
- **POST /users/login**: Autentica um usuário e retorna um token JWT
- **GET /users/myuser**: Retorna os dados do usuário autenticado
- **PUT /users/myuser**: Atualiza os dados do usuário autenticado

### Produtos

- **POST /products**: Cria um novo produto
- **GET /products**: Lista todos os produtos
- **GET /products/**

  : Mostra os detalhes de um produto específico

- **PUT /products/**

  : Atualiza um produto específico

- **DELETE /products/**

  : Deleta um produto específico

- **GET /products/showUserProducts**: Lista os produtos do usuário autenticado
- **GET /products/showRecieverProducts**: Lista os produtos recebidos pelo usuário autenticado
- **PATCH /products/schedule/**

  : Agenda uma ação para um produto específico

- **PATCH /products/concludeDonation/**

  : Conclui a doação de um produto específico

## Estrutura de Pastas

```plaintext
├── src
│   ├── controller
│   │   ├── ProductController.js
│   │   └── UserController.js
│   ├── helpers
│   │   ├── errorHandling.js
│   │   ├── imageUpload.js
│   │   └── managerJwt.js
│   ├── model
│   │   ├── Product.js
│   │   └── User.js
│   ├── public
│   │   └── images
│   │       ├── products
│   │       └── users
│   ├── routes
│   │   ├── ProductRoutes.js
│   │   └── UserRoutes.js
│   ├── service
│   │   ├── ProductService.js
│   │   └── UserService.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md

```
