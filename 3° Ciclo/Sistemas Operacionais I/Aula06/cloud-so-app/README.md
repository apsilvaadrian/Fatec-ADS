# cloud-so-app

Aplicação acadêmica em Express.js que apresenta informações do sistema operacional hospedeiro usando o módulo nativo `node:os`.

## Executar localmente

```bash
npm install
npm start
```

Acesse `http://localhost:3000`.

## Endpoints

- `GET /` — painel web.
- `GET /api/system` — métricas em JSON.
- `GET /healthz` — verificação de saúde para o Render.

O arquivo `render.yaml` contém a configuração de infraestrutura como código para publicação no Render.
