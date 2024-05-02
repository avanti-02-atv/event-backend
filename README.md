# EventHub: API RESTful para Gerenciamento de Eventos Culturais

Bem-vindo ao repositório da API RESTful do EventHub! Esta API oferece funcionalidades abrangentes para o gerenciamento de eventos culturais, permitindo aos usuários criar, listar, pesquisar e filtrar eventos de forma eficaz.

# Sobre o EventHub

O EventHub é uma plataforma desenvolvida para facilitar o gerenciamento de eventos culturais. Com esta API, organizadores podem criar e listar eventos, enquanto participantes podem explorar, pesquisar e filtrar eventos com base em categorias, locais e datas.

## Como Executar a Aplicação

Siga os passos abaixo para executar a aplicação:

1. Preencha o arquivo `.env-example` com seus dados e renomeie-o para `.env`.

2. Instale todas as dependências com o comando:
   ```
   npm i
   ```
3. Crie o banco de dados executando o comando:
   ```
   npx prisma migrate dev --name init
   ```
4. Inicie o projeto com o comando:
   ```
   npm run dev
   ```

5. Acesse a aplicação através do navegador utilizando o endereço:
   ```
   localhost:3000
   ```
Após exucutar o projeto, acesse o endereço http://localhost:3000/api-docs, para acessar o swagger da aplicação com as rotas da API.

## Ferramentas Utilizadas

- **Tecnologias:** Express, Prisma, JWT.
- **Banco de Dados:** PostegresSQL.
- **Desenvolvimento:** VS Code.

## Equipe
- Robson do Amaral Diógenes - Email: robsonad07@gmail.com
- Fulgêncio Thierry Silva - Email: thierryfulgencio@gmail.com
- Luiz Eduardo - Email: luizeduardoedd1@gmail.com

Este sistema foi desenvolvido como um trabalho do bootcamp de desenvolvimento full stack oferecido pelo Avanti em parceria com Instituto Atlântico.
