
# Cadastro de Desenvolvedores e Niveis

Este projeto tem como intuito realizar o CRUD completo de um Desenvolvedor e o CRUD completo de um Nivel.


## Documentação da API

#### Retorna todos os desenvolvedores

```http
  GET /desenvolvedores
```

#### Retorna um desenvolvedor a partir do ID

```http
  GET /desenvolvedores/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |


#### Insere um desenvolvedor

```http
  POST /create/desenvolvedor
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | Nome do desenvolvedor |
| `sexo`      | `string` | Sexo do desenvolvedor |
| `datanascimento`      | `date` | Data de nascimento do desenvolvedor |
| `idade`      | `integer` | Idade do desenvolvedor |
| `hobby`      | `string` | Hobby do desenvolvedor |
| `nivel_id`      | `integer` | ID do nivel |

#### Edita um desenvolvedor a partir do ID

```http
  PUT /edit/desenvolvedor/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |

#### Deleta um desenvolvedor a partir do ID

```http
  DELETE /delete/desenvolvedor/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |


#### Retorna todos os niveis

```http
  GET /niveis
```

#### Retorna um nivel a partir do ID

```http
  GET /niveis/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |


#### Insere um nivel

```http
  POST /create/niveis
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nivel`      | `string` | Nome do nivel |


#### Edita um nivel a partir do ID

```http
  PUT /edit/niveis/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |

#### Deleta um nivel a partir do ID

```http
  DELETE /delete/niveis/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |

## Pré-requisitos

- Node.js e npm: Certifique-se de ter o Node.js instalado na sua máquina. O Node.js inclui o npm (Node Package Manager) para gerenciar dependências de pacotes. Você pode baixar o Node.js em https://nodejs.org/.
- Instalar componentes utilizados no front-end para o React.
- Utilizar a porta 3000 para o front-end e a porta 3333 para a API (lembrar de habilitar estas portas)
## Stack utilizada

**Front-end:** React, JavaScript, HTML, CSS

**Back-end:** NodeJs, Express


## Banco de Dados

O banco de dados utilizado foi o ElephantSQL que é uma aplicação web, em que nessa aplicação é disponibilizado 20 MB gratuitos para você realizar armazenamento no banco de dados PostgreSQL.
A conexão com ele está sendo feita na API dentro do arquivo .env desta forma
- POSTGRES_URL = postgres://wrwjbbyz:dulQLpBbcGBEna_0CqR7OOhGF46OKdwS@silly.db.elephantsql.com/wrwjbbyz
## Aprendizados

Este projeto foi uma das minhas primeiras experiencias com esta stack, escolhi utilizar NodeJs e React afim de aprimorar meus conhecimentos na area.
Pude aprender o fluxo completo de um CRUD com NodeJs e aprender sobre as infinitas possibilidades que o React fornece durante o desenvolvimento.


## Expressões de gratidão

- Deixo aqui um agradecimento especial a equipe Gazin Tech por me proporcionar a oportunidade de realizar este desafio.
