# vendas-api
API de Vendas em NodeJS com Typescript, PostgreSQL &amp; Redis

# CLI do typeorm
### Criar um migration manualmente
yarn typeorm migrate -- -d src/config/app_data_source.ts
yarn typeorm migration:create src/modules/user/migration/CreateUserTable

### Para criar uma nova migrations
yarn typeorm migration:create  src/modules/uuid/migration/CreateUuidExtensions

### Para executar as migrations
