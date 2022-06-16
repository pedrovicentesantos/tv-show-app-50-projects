# Repositório

O repositório contém o projeto de uma aplicação que retorna as séries mais populares e permitir pesquisar por séries, utilizando a API do [The Movie DB](https://developers.themoviedb.org/3).

Como a API do The Movie DB necessita de uma chave de API, foi desenvolvido um servidor Node.js que funciona como um BFF para o fronted, dessa forma, a chave de API fica oculta para o fronted.

É uma adaptação do projeto Movie App do site [50 Projects 50 Days](https://50projects50days.com).

O deploy foi feito no Heroku e pode ser acessado em:

[https://tv-show-app-50-projects.herokuapp.com](https://tv-show-app-50-projects.herokuapp.com)

## Rodando a aplicação

Basta instalar as dependências, adicionar as variáveis apropriadas no arquivo `.env` e executar o comando `yarn dev` para rodar a aplicação. Feito isso a aplicação estará disponível em [http://localhost:5000](http://localhost:5000).

## BFF

Além de chamar a API do The Movie DB com a chave de API correta, o BFF também possui configurado configurado um cache para as requisições.

É composto por duas rotas:

- /api/v1/popular:
  - Retorna as 20 séries mais populares no momento
- api/v1/search?query={query}
  - Retorna as 20 séries que contenham o termo {query}
