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

## Sensores no Windows

O uso da GPU também pode ser obtido pelo contador nativo `GPU Engine` do Windows. Temperaturas de CPU e GPU não são disponibilizadas por todos os drivers; quando isso ocorrer, execute o [LibreHardwareMonitor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases), abra `Options > Remote Web Server > Run` (porta padrão `8085`) e mantenha-o aberto enquanto o app estiver rodando. O app lê a API local `data.json` do LibreHardwareMonitor e também tenta WMI para compatibilidade com versões antigas/OpenHardwareMonitor, informando a fonte da leitura no painel.
