# Plataforma de Liquidação

## Descrição

Serviço de transferência que será utilizado por outros serviços dentro de uma
mesma empresa. O seu serviço deve recebe requisições para efetuar uma Transferência de um
determinado valor, depois ele envia os dados necessários para a plataforma de
Liquidação do banco e retornar uma resposta para o serviço do cliente.

## Documentação
```bash
# Rota
/api-docs
```

## Executar APP com Docker

```bash
$ docker-compose up
```

## Instalação

```bash
$ yarn install
```

## Executar APP

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Executar Testes

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```