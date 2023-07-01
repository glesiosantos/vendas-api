# vendas-api
API de Vendas em NodeJS com Typescript, PostgreSQL &amp; Redis

# CLI do typeorm
### Criar um migration manualmente
yarn typeorm migration:create src/modules/user/migration/CreateUserTable

### Apresentar migration pendente e rodas as migrations
yarn typeorm migration:show -d src/config/app_data_source.ts
yarn typeorm migration:run -d src/config/app_data_source.ts

### Para criar uma nova migrations
yarn typeorm migration:create  src/modules/__nome_modulo__/migration/__nome_tabela__
