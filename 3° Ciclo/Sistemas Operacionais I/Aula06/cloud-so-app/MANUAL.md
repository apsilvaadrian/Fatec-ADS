# Manual técnico — cloud-so-app

## 1. Objetivo

O `cloud-so-app` é uma aplicação web acadêmica construída com Express.js e Node.js. Ela coleta, no servidor, informações do sistema operacional por meio do módulo nativo `node:os` e apresenta os dados em um painel responsivo.

Informações exibidas: nome do host, plataforma, arquitetura, quantidade de CPUs, modelo do processador, memória total, memória livre, tempo de atividade do sistema, carga média e uptime do processo Node.js.

## 2. Pré-requisitos e instalação das ferramentas

### Ferramentas

- Node.js 18 ou superior;
- npm, instalado junto com o Node.js;
- Git, para versionamento e conexão com o repositório da disciplina;
- navegador web atualizado;
- conta no Render, para publicação do serviço.

Verifique as versões:

```bash
node --version
npm --version
git --version
```

No ambiente de execução deste trabalho, o Node.js disponível foi o `v24.19.0`. O executável npm do sistema não estava disponível no PATH; por isso, a instalação local deve ser feita em um ambiente com Node.js distribuído oficialmente, ou usando um gerenciador de pacotes configurado.

## 3. Criação do projeto

```bash
mkdir cloud-so-app
cd cloud-so-app
npm init -y
npm install express
```

O projeto contém:

```text
cloud-so-app/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
├── README.md
├── render.yaml
└── server.js
```

## 4. Desenvolvimento da aplicação

### 4.1 Servidor Express

O arquivo `server.js` importa `express`, `node:os` e `node:path`. O Express publica a pasta `public` e disponibiliza três rotas:

- `/`: entrega a interface web;
- `/api/system`: retorna os dados atuais em JSON;
- `/healthz`: retorna `{ "status": "ok" }`, permitindo que o Render valide a saúde do serviço.

A coleta é feita pela função `getSystemInfo()`:

```js
{
  hostname: os.hostname(),
  platform: os.platform(),
  architecture: os.arch(),
  cpuCount: os.cpus().length,
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
  uptime: os.uptime()
}
```

O servidor escuta `process.env.PORT || 3000` e o endereço `0.0.0.0`, combinação compatível com execução local e com o ambiente do Render.

### 4.2 Interface web

O navegador consulta `/api/system` usando `fetch`. Os bytes são convertidos para unidades legíveis, o uptime é formatado em dias/horas/minutos/segundos e a tela é atualizada a cada 10 segundos.

O layout foi organizado em cartões de métricas, painéis de continuidade/runtime e uma seção de leitura acadêmica dos conceitos de Sistemas Operacionais.

## 5. Testes locais realizados

### 5.1 Teste do servidor e da API

Em um terminal:

```bash
npm start
```

Em outro terminal:

```bash
curl http://localhost:3000/healthz
curl http://localhost:3000/api/system
```

Resultados esperados:

```json
{ "status": "ok" }
```

E um objeto JSON contendo `hostname`, `platform`, `architecture`, `cpuCount`, `totalMemory`, `freeMemory` e `uptime`.

### 5.2 Teste no navegador

Abra `http://localhost:3000`. A página deve mostrar o título “O sistema por trás da aplicação”, seis cartões de recursos, o tempo de atividade, o contexto do runtime Node.js e os quatro conceitos acadêmicos.

Também é possível abrir `http://localhost:3000/api/system` para inspecionar diretamente a resposta JSON.

## 6. Publicação no Render

### 6.1 Preparar o repositório

Na pasta do projeto:

```bash
git init
git add .
git commit -m "feat: cria cloud-so-app"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cloud-so-app.git
git push -u origin main
```

Substitua a URL pelo repositório da disciplina. O diretório inicial fornecido para este trabalho não era um repositório Git; ele foi inicializado localmente e recebeu o commit `feat: cria cloud-so-app`. Para que o material também fique no repositório remoto oficial da turma, adicione o `remote` correspondente e faça o `push`.

### 6.2 Criar o Web Service

1. Acesse o painel do Render e escolha **New > Web Service**.
2. Conecte o repositório Git.
3. Selecione o branch `main`.
4. Use `npm install` em **Build Command**.
5. Use `npm start` em **Start Command**.
6. Escolha o plano adequado (o plano Free é suficiente para demonstração).
7. Crie o serviço e aguarde o deploy.

O arquivo `render.yaml` já registra esses valores como infraestrutura como código. Depois do deploy, o endereço terá o formato `https://cloud-so-app.onrender.com` (o domínio exato pode variar se o nome já estiver em uso).

### 6.3 Testes após o deploy

```bash
curl https://SEU-SERVICO.onrender.com/healthz
curl https://SEU-SERVICO.onrender.com/api/system
```

No navegador, acesse a URL pública e confirme que o painel carrega. O primeiro acesso em um plano gratuito pode apresentar latência devido ao ciclo de suspensão/reativação do serviço.

Os campos usados no `render.yaml` (`runtime: node`, `buildCommand`, `startCommand` e `healthCheckPath`) seguem a referência oficial de Blueprints e de health checks do Render: [Blueprint YAML Reference](https://render.com/docs/blueprint-spec) e [Health Checks](https://render.com/docs/health-checks).

## 7. Conceitos de Sistemas Operacionais observados

### Processos

O servidor Node.js é um processo do sistema operacional. O SO fornece um identificador, espaço de endereçamento, descritores de arquivo e tempo de CPU para esse processo. `process.uptime()` mede há quanto tempo o processo da aplicação está ativo, enquanto `os.uptime()` mede há quanto tempo o SO hospedeiro está ligado. A diferença entre as duas medidas ajuda a perceber que um processo pode ter começado depois do boot da máquina.

### Gerenciamento de memória

`os.totalmem()` informa a capacidade de memória física observada pelo ambiente e `os.freemem()` indica a parcela livre no instante da coleta. Esses valores são instantâneos e variam conforme processos, cache e serviços em execução. Em um contêiner ou máquina virtual, a visão pode refletir limites e políticas do ambiente de virtualização, e não necessariamente toda a memória física do servidor subjacente.

### Uso de CPU

`os.cpus()` retorna informações sobre os processadores lógicos visíveis ao processo. A quantidade não representa necessariamente núcleos físicos. A carga média (`os.loadavg()`) complementa a observação: é uma medida da demanda de execução/espera reportada pelo sistema Unix-like. Em Windows, esse vetor pode não fornecer a mesma semântica ou pode retornar zeros; por isso, o painel o apresenta como contexto adicional, e não como percentual universal de uso.

### Sistema operacional hospedeiro

`os.hostname()`, `os.platform()` e `os.arch()` identificam o ambiente que executa o Node.js. O “hospedeiro” é o SO visível ao runtime. Localmente, ele costuma ser o computador do desenvolvedor; no Render, é o ambiente de execução disponibilizado pelo provedor.

### Virtualização

Serviços de nuvem normalmente executam aplicações em contêineres, VMs ou camadas equivalentes de isolamento. O processo acessa recursos por interfaces controladas pelo hospedeiro. Assim, a aplicação não precisa conhecer o hardware físico real para consultar `os.cpus()` ou `os.totalmem()`: ela recebe uma visão lógica e limitada dos recursos atribuídos.

### Computação em nuvem

O Render fornece o modelo PaaS: o aluno entrega código e comandos de build/start, enquanto o provedor administra servidores, rede, sistema operacional base e ciclo de vida do serviço. O endpoint `/healthz` permite monitoramento, e a variável `PORT` torna a aplicação compatível com a porta dinâmica do provedor. A URL pública demonstra acesso remoto e elasticidade operacional, embora o projeto não implemente escalabilidade automática por conta própria.

## 8. Comparação entre ambientes

| Aspecto | Execução local | Execução no Render |
|---|---|---|
| Hostname | Nome do computador/ambiente local | Nome atribuído ao ambiente de execução do serviço |
| Plataforma e arquitetura | SO e arquitetura do computador do aluno | SO/arquitetura expostos pela infraestrutura do provedor |
| CPU e memória | Recursos disponíveis na máquina local | Recursos limitados pelo plano, contêiner ou VM |
| Uptime do SO | Tempo desde o boot do computador/VM local | Tempo desde a inicialização do ambiente hospedeiro alocado |
| Acesso | `localhost:3000` | URL HTTPS pública do Render |
| Ciclo de vida | Controlado manualmente pelo aluno | Gerenciado pelo PaaS; pode suspender/reativar em plano gratuito |
| Escala | Limitada ao computador local | Pode ser alterada pela configuração do serviço/plano |

Os números não devem ser comparados como se medissem a mesma máquina. O significado técnico é semelhante, mas a origem dos recursos é diferente.

## 9. Conclusões

O projeto mostra, de forma prática, que uma aplicação de alto nível consegue observar propriedades do sistema operacional por APIs nativas do Node.js. A camada Express organiza o acesso HTTP e a interface transforma leituras técnicas em uma visualização compreensível.

Os principais aprendizados são: processos têm ciclo de vida independente do boot do SO; memória e CPU são recursos compartilhados e dinâmicos; virtualização abstrai o hardware; e a nuvem entrega uma infraestrutura administrada, na qual a aplicação deve respeitar portas, health checks e limites de recursos.

Como evolução, o projeto poderia adicionar histórico das métricas, autenticação, armazenamento em banco, alertas de limiar e coleta específica por plataforma. Essas extensões não são necessárias para o objetivo atual.
