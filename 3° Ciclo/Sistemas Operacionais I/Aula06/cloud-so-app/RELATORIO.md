# Relatório da atividade — cloud-so-app

## 1. Objetivo

O projeto `cloud-so-app` é uma aplicação web acadêmica desenvolvida com Node.js e Express.js. A aplicação coleta informações do sistema operacional hospedeiro e apresenta os dados em um painel acessível pelo navegador.

O trabalho demonstra a execução do mesmo serviço no computador local e em plataformas de nuvem. O Render já está publicado; a segunda publicação deverá ser feita no Railway para atender à etapa de comparação entre provedores.

## 2. Atendimento ao enunciado

| Requisito da atividade | Situação | Evidência |
|---|---|---|
| Criar uma aplicação com Express.js chamada `cloud-so-app` | Concluído | `package.json`, `server.js` e `public/` |
| Exibir host, plataforma, arquitetura e CPUs | Concluído | Painel e endpoint `/api/system` |
| Exibir memória total e livre | Concluído | Painel e endpoint `/api/system` |
| Exibir tempo de atividade do sistema | Concluído | Painel e campo `uptime` |
| Exibir percentual de RAM, CPU médio, uptime formatado, arquivos, IP e status geral | Concluído | Cards da seção “Visão geral”, painel flutuante por recurso e endpoint `/api/system` |
| Identificar execução local/cloud, provedor, porta e variáveis de ambiente seguras | Concluído | Seção “Ambiente de execução” e campo `deployment` |
| Testar localmente no navegador | Concluído | `http://localhost:3000` |
| Publicar o projeto no GitHub | Concluído | [Repositório Fatec-ADS](https://github.com/apsilvaadrian/Fatec-ADS) |
| Publicar a aplicação no Render | Concluído | [cloud-so-app no Render](https://cloud-so-app-9yug.onrender.com/) |
| Publicar em outra plataforma semelhante ao Render | Pendente | Railway — falta criar o serviço e registrar a URL |
| Comparar Render e a segunda plataforma | Parcial | Tabela da seção 5.4; completar os valores do Railway após o deploy |
| Relacionar o projeto aos conceitos de Sistemas Operacionais | Concluído | Seção 6 deste relatório e seção 7 do manual |
| Documentar instalação, desenvolvimento, deploy, testes e conclusão | Concluído | [`MANUAL.md`](./MANUAL.md) |

O enunciado desta etapa também solicita a escolha de uma plataforma semelhante ao Render, a realização de um segundo deploy e a comparação entre os servidores. Essa é a única pendência externa da entrega.

## 3. Tecnologias e configuração

- Node.js 18 ou superior;
- Express.js;
- módulo nativo `node:os`;
- pacote `systeminformation` para informações de hardware;
- HTML, CSS e JavaScript no frontend;
- Chart.js carregado pelo frontend para os gráficos;
- Render como plataforma PaaS;
- nenhuma base de dados necessária;
- nenhuma chave de API necessária;
- porta definida por `PORT`, com padrão local `3000`.

O arquivo `render.yaml` define:

- serviço web Node;
- plano gratuito;
- comando de build `npm install`;
- comando de execução `npm start`;
- verificação de saúde em `/healthz`.

## 4. Rotas disponíveis

| Rota | Função |
|---|---|
| `/` | Painel web |
| `/api/system` | Informações do sistema operacional e do processo Node.js |
| `/api/hardware` | GPU, uso da GPU e sensores térmicos quando disponíveis |
| `/api/processes` | Processos em execução |
| `/healthz` | Verificação de saúde do serviço |

## 5. Testes e comparação entre ambientes

Os testes abaixo foram realizados em 6 de outubro de 2026. Valores de memória, uptime e uso de recursos são dinâmicos e podem mudar entre as execuções.

### 5.1 Execução local

- endereço: `http://localhost:3000`;
- sistema: Windows (`win32`);
- arquitetura: `x64`;
- processadores lógicos: 12;
- processador identificado: AMD Ryzen 5 5600G with Radeon Graphics;
- memória total observada: aproximadamente 15,9 GB;
- Node.js: `v24.21.0`;
- `/healthz`: retornou `{ "status": "ok" }`.

### 5.2 Execução no Render

- endereço: `https://cloud-so-app-9yug.onrender.com/`;
- sistema: Linux;
- arquitetura: `x64`;
- processadores lógicos: 8;
- processador identificado: AMD EPYC 7R13 Processor;
- memória total observada: aproximadamente 30,6 GB;
- Node.js: `v26.10.0`;
- `/healthz`: HTTP 200;
- `/api/system`: HTTP 200.

### 5.3 Segunda publicação — Railway

O Railway foi escolhido por ser uma plataforma PaaS com serviços persistentes, integração com repositórios GitHub e domínio público para serviços web. A documentação oficial descreve a conexão do repositório e o deploy automático a cada novo commit: [Railway Services](https://docs.railway.com/services) e [Quick Start](https://docs.railway.com/quick-start).

Para concluir esta etapa:

1. Acesse [railway.app](https://railway.app/) e faça login com a conta GitHub.
2. Crie um novo projeto e escolha **Deploy from GitHub repo**.
3. Selecione `apsilvaadrian/Fatec-ADS` e o branch `main`.
4. Configure a raiz do serviço como `3° Ciclo/Sistemas Operacionais I/Aula06/cloud-so-app`.
5. Use `npm install` como build command e `npm start` como start command, caso o Railway não os detecte automaticamente.
6. Gere um domínio público para o serviço.
7. Teste `https://SEU-DOMINIO/healthz` e `https://SEU-DOMINIO/api/system`.
8. Registre a URL, a data do deploy e uma captura de tela do dashboard no relatório.

O código já utiliza `process.env.PORT` e escuta em `0.0.0.0`, portanto está preparado para o modelo de execução do Railway. A plataforma fornece a variável `PORT` e exige que o serviço exponha essa porta para receber tráfego público ([Railway public networking](https://docs.railway.com/guides/public-networking)).

### 5.4 Comparação entre Render e Railway

| Aspecto | Render | Railway |
|---|---|---|
| Tipo de serviço | Web Service PaaS | Serviço persistente em container |
| Origem do código | GitHub conectado ao serviço | GitHub conectado ao serviço |
| Build | `npm install` | Detecção automática ou `npm install` |
| Execução | `npm start` | `npm start` |
| Porta | Variável `PORT` | Variável `PORT` |
| Health check | `/healthz` configurado no `render.yaml` | Validar `/healthz` após publicar; configurar conforme o painel |
| Domínio público | `cloud-so-app-9yug.onrender.com` | **Preencher após o deploy** |
| Sistema observado | Linux do serviço Render | Linux do serviço Railway |
| Deploy automático | Novo commit no branch conectado | Novo commit no branch conectado |
| Configuração | `render.yaml` versionado | Configuração do projeto/serviço no painel |

As duas plataformas executam o mesmo código e expõem recursos do ambiente Linux remoto, não do computador local. Por isso, GPU e temperaturas do PC não devem aparecer nesses deploys cloud; localmente, esses sensores dependem do Windows e do LibreHardwareMonitor.

### 5.3 Interpretação

Os valores são diferentes porque a aplicação não acessa a mesma máquina nos dois casos. Localmente, o Node.js observa o computador do aluno. No Render, observa o ambiente Linux atribuído pelo provedor.

| Aspecto | Local | Render |
|---|---|---|
| Hospedeiro | Windows do computador do aluno | Linux do ambiente cloud |
| Acesso | `localhost:3000` | URL HTTPS pública |
| Recursos | Máquina local | Recursos do serviço no Render |
| Porta | Padrão `3000` | Porta fornecida pela variável `PORT` |
| Ciclo de vida | Iniciado e encerrado manualmente | Gerenciado pelo PaaS |
| Escala | Limitada ao computador local | Definida pelo serviço e pelo plano |

## 6. Relação com Sistemas Operacionais

### Processos

O servidor Node.js é um processo do sistema operacional. O painel exibe seu PID, uptime, memória e uso acumulado de recursos. A lista de processos mostra outros programas ativos no ambiente.

### Gerenciamento de memória

`os.totalmem()` e `os.freemem()` mostram a memória observada pelo runtime. A memória livre varia conforme os processos e serviços em execução.

### Uso de CPU

`os.cpus()` informa os processadores lógicos visíveis ao processo. O painel também calcula uma estimativa de uso da CPU durante a execução.

### Sistema operacional hospedeiro

`os.platform()`, `os.type()`, `os.release()` e `os.arch()` identificam o sistema operacional exposto ao Node.js. A comparação entre `win32` e `linux` evidencia a diferença entre os ambientes.

### Virtualização

O Render executa a aplicação em uma infraestrutura isolada. Os recursos exibidos representam a visão lógica disponibilizada ao serviço, e não necessariamente o hardware físico completo do provedor.

### Computação em nuvem

O Render fornece um modelo PaaS: o desenvolvedor entrega o código e os comandos de execução, enquanto o provedor administra servidores, rede, sistema operacional e ciclo de vida do serviço.

## 7. Sensores de GPU e temperatura

No Windows, o uso da GPU pode ser obtido pelo contador nativo `GPU Engine`. Temperaturas de CPU e GPU dependem dos sensores expostos pelo driver e pelo hardware.

O projeto também reconhece o LibreHardwareMonitor pela API local `http://127.0.0.1:8085/data.json`. Para usar essa fonte, é necessário abrir o LibreHardwareMonitor, acessar `Options > Remote Web Server > Run` e manter o programa aberto.

No Render, os sensores do computador local não ficam disponíveis. Isso é esperado: o serviço cloud só pode observar os recursos do próprio ambiente Linux.

## 8. Conclusão

O projeto atende à parte de implementação, à publicação no GitHub e ao deploy no Render. Para concluir integralmente a atividade, ainda é necessário publicar o serviço no Railway, preencher sua URL na tabela comparativa, testar `/healthz` e `/api/system` e anexar as evidências visuais solicitadas.

A entrega final deve incluir o link do repositório, os links públicos do Render e do Railway, este relatório, o `MANUAL.md`, os testes dos endpoints e capturas de tela da execução local e das duas páginas publicadas.
