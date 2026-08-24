# 🖥️ História dos Sistemas Operacionais

> **Da operação manual aos smartphones:** a evolução dos sistemas operacionais acompanha diretamente a evolução do hardware, das formas de interação e das necessidades dos usuários.

---

## 📚 Sumário

1. [Introdução](#-introdução)
2. [Primeira geração — 1945–1955](#1️⃣-primeira-geração--19451955)
3. [Segunda geração — 1955–1965](#2️⃣-segunda-geração--19551965)
4. [Terceira geração — 1965–1980](#3️⃣-terceira-geração--19651980)
5. [UNIX](#-unix)
6. [Quarta geração — 1980–presente](#4️⃣-quarta-geração--1980presente)
7. [Quinta geração — 1990–presente](#5️⃣-quinta-geração--1990presente)
8. [Comparação das cinco gerações](#-comparação-das-cinco-gerações)
9. [Linha do tempo](#-linha-do-tempo)
10. [Evolução das funções dos sistemas operacionais](#-evolução-das-funções-dos-sistemas-operacionais)
11. [Relação entre hardware e software](#-relação-entre-hardware-e-software)
12. [Importância da multiprogramação](#-importância-histórica-da-multiprogramação)
13. [Importância do compartilhamento de tempo](#-importância-do-compartilhamento-de-tempo)
14. [Importância dos computadores pessoais](#-importância-dos-computadores-pessoais)
15. [Importância da computação móvel](#-importância-da-computação-móvel)
16. [Segurança ao longo da história](#-segurança-ao-longo-da-história)
17. [Conclusão](#-conclusão)
18. [Resumo das cinco gerações](#-resumo-das-cinco-gerações)
19. [Considerações finais](#-considerações-finais)
20. [Referência bibliográfica](#-referência-bibliográfica)

---

# 📖 Introdução

A história dos sistemas operacionais está diretamente ligada à evolução dos computadores. À medida que o hardware se tornou mais rápido, menor, barato e complexo, surgiu também a necessidade de criar softwares capazes de **organizar, automatizar e controlar** os recursos disponíveis.

Nos primeiros computadores eletrônicos, praticamente todo o controle era realizado manualmente. Os programadores precisavam conhecer detalhes do hardware, preparar cada programa antes da execução e acompanhar cuidadosamente o funcionamento da máquina. Não existiam interfaces gráficas, sistemas de arquivos modernos, multitarefa ou mecanismos sofisticados de segurança.

Com o passar do tempo, os sistemas operacionais assumiram cada vez mais responsabilidades.

### 🎯 Principais funções que surgiram ao longo da evolução

- ⚙️ **Gerenciamento do processador**
- 🧠 **Gerenciamento de memória**
- 📂 **Organização de arquivos**
- 🔄 **Execução e controle de processos**
- ⌨️ **Controle de entrada e saída**
- 🌐 **Comunicação em rede**
- 🔐 **Segurança e permissões**
- 🔋 **Gerenciamento de energia**
- 📱 **Controle de sensores e dispositivos móveis**

Segundo a divisão histórica apresentada por **Andrew S. Tanenbaum e Herbert Bos**, a evolução dos sistemas operacionais pode ser compreendida em cinco grandes períodos.

| Geração | Período aproximado | Tecnologia dominante | Principal evolução |
|:--:|:--:|:--|:--|
| 🟤 **1ª** | 1945–1955 | Válvulas eletrônicas | Operação praticamente manual |
| 🔵 **2ª** | 1955–1965 | Transistores | Sistemas em lote e linguagens de alto nível |
| 🟢 **3ª** | 1965–1980 | Circuitos integrados | Multiprogramação e compartilhamento de tempo |
| 🟣 **4ª** | 1980–presente | Microprocessadores | Computadores pessoais e interfaces gráficas |
| 🟠 **5ª** | 1990–presente | Computação móvel | Smartphones, tablets, sensores e redes sem fio |

> 💡 **Ideia central:** cada geração resolveu limitações da anterior e, ao mesmo tempo, criou novos desafios para os sistemas operacionais.

---

# 1️⃣ Primeira geração — 1945–1955

## 🔌 1.1 Válvulas eletrônicas

A primeira geração dos computadores ocorreu aproximadamente entre **1945 e 1955**. Nesse período, as **válvulas eletrônicas** eram utilizadas como componentes fundamentais das máquinas.

Elas permitiam realizar operações eletrônicas, porém apresentavam diversas limitações:

| Característica | Consequência |
|---|---|
| 📦 Grande tamanho | Computadores ocupavam salas inteiras |
| ⚡ Alto consumo de energia | Exigiam instalações elétricas robustas |
| 🌡️ Produção intensa de calor | Necessidade de refrigeração e manutenção |
| 🛠️ Baixa confiabilidade | Falhas eram relativamente frequentes |
| 💰 Alto custo | Poucas instituições conseguiam adquirir as máquinas |

Como existiam milhares de componentes funcionando simultaneamente, a falha de uma única válvula poderia comprometer o funcionamento do computador.

Por isso, universidades, governos, centros de pesquisa e grandes organizações eram os principais usuários dessas máquinas.

> ⚠️ **Limitação importante:** o computador ainda era uma ferramenta extremamente especializada, distante do uso cotidiano.

---

## 💻 1.2 Programação

A programação dos primeiros computadores era muito diferente da programação atual.

Os programas eram escritos principalmente em:

- 🧮 **Linguagem de máquina**
- 🔧 **Linguagem de montagem (Assembly)**

A linguagem de máquina utilizava códigos diretamente compreendidos pelo processador. Isso tornava o desenvolvimento lento, difícil e sujeito a erros.

### Comparação

| Aspecto | Linguagem de máquina | Assembly |
|---|---|---|
| Representação | Códigos numéricos/binários | Instruções simbólicas |
| Facilidade de leitura | Muito baixa | Maior |
| Dependência do hardware | Muito alta | Muito alta |
| Tradução | Direta para a CPU | Utiliza um montador |
| Produtividade | Baixa | Um pouco maior |

Mesmo com o surgimento da linguagem de montagem, o programador ainda precisava conhecer profundamente o hardware.

Não existiam as várias camadas de abstração presentes atualmente.

---

## 🧑‍🔧 1.3 Operação manual

Os computadores dessa geração **não possuíam sistemas operacionais modernos**.

A execução normalmente seguia um processo semelhante a este:

```text
Preparar programa
      ↓
Carregar dados
      ↓
Configurar máquina
      ↓
Executar
      ↓
Aguardar processamento
      ↓
Coletar resultados
```

Grande parte dessas etapas dependia de operadores humanos.

Enquanto o operador preparava um novo programa ou retirava resultados, o processador podia permanecer parado.

Como o computador era extremamente caro, esse desperdício de tempo tornou-se um problema importante.

---

## 🚧 1.4 Principais limitações

| Problema | Impacto |
|---|---|
| 🔥 Muito calor | Dificuldade de manter as máquinas funcionando |
| ⚡ Alto consumo | Custos elevados |
| 🧩 Muitos componentes | Falhas frequentes |
| 🧠 Programação complexa | Desenvolvimento lento |
| 👨‍🔧 Operação manual | Grande desperdício de tempo |
| 🏗️ Tamanho físico | Necessidade de grandes instalações |

A primeira geração estabeleceu as bases da computação eletrônica, mas mostrou claramente que era necessário **automatizar a utilização das máquinas**.

➡️ Essa necessidade preparou o caminho para a segunda geração.

---

# 2️⃣ Segunda geração — 1955–1965

## 🔹 2.1 Transistores

A segunda geração começou aproximadamente em **1955**, com a substituição das válvulas pelos **transistores**.

Os transistores apresentavam várias vantagens:

| Válvulas | Transistores |
|---|---|
| Grandes | Menores |
| Alto consumo | Menor consumo |
| Muito calor | Menor aquecimento |
| Menor confiabilidade | Maior confiabilidade |
| Manutenção frequente | Menor necessidade de manutenção |

Essa evolução permitiu construir computadores menores, mais eficientes e confiáveis.

Empresas passaram a utilizar computadores em atividades comerciais, enquanto universidades e centros de pesquisa continuaram utilizando as máquinas para cálculos científicos.

---

## 🧑‍💻 2.2 Linguagens de alto nível

Durante essa geração, as linguagens de programação de alto nível começaram a ganhar importância.

Duas linguagens se destacaram:

| Linguagem | Principal aplicação |
|---|---|
| 🔢 **FORTRAN** | Ciência, engenharia e matemática |
| 🧾 **COBOL** | Aplicações comerciais e administrativas |

Essas linguagens permitiam que o programador se concentrasse mais no problema e menos nos detalhes da máquina.

O **compilador** tornou-se essencial:

```text
Código-fonte
    ↓
Compilador
    ↓
Código de máquina
    ↓
Execução
```

> 💡 A principal mudança foi o aumento da **abstração** entre o programador e o hardware.

---

## 📦 2.3 Sistemas em lote

Uma das principais inovações dessa geração foi o **processamento em lote (batch processing)**.

Em vez de executar um programa por vez com intervenção constante do operador, vários trabalhos eram preparados antecipadamente.

### Funcionamento simplificado

```text
Trabalho 1 ─┐
Trabalho 2 ─┼──► Fila de trabalhos ───► Processamento automático
Trabalho 3 ─┘
```

### Vantagens

- ✅ Menor intervenção humana
- ✅ Melhor aproveitamento do computador
- ✅ Execução automática de vários trabalhos
- ✅ Redução do tempo entre um programa e outro

---

## 🧠 2.4 Monitores residentes

Os sistemas em lote utilizavam programas de controle conhecidos como **monitores residentes**.

Esses programas permaneciam na memória e controlavam a sequência dos trabalhos.

### Funções do monitor residente

| Função | Descrição |
|---|---|
| ▶️ Iniciar trabalho | Carregava ou iniciava o próximo programa |
| 🔄 Controlar sequência | Organizava a ordem dos trabalhos |
| 🛑 Detectar término | Identificava quando um programa terminava |
| ➡️ Avançar | Iniciava automaticamente o próximo trabalho |

O monitor residente pode ser visto como um dos primeiros passos em direção aos sistemas operacionais modernos.

---

## ⚠️ 2.5 Limitações dos sistemas em lote

Apesar dos avanços, ainda existiam problemas.

### Principais limitações

- ⏳ O usuário precisava esperar pelo resultado.
- 🐢 Operações de entrada e saída eram lentas.
- 💤 A CPU podia ficar ociosa.
- 🐞 Erros só eram percebidos depois do processamento.
- 🚫 Não havia interação direta durante a execução.

Isso levou a uma nova ideia:

> 💡 **Se um programa estiver esperando uma operação de entrada ou saída, por que não executar outro programa nesse intervalo?**

Essa ideia deu origem à **multiprogramação**.

---

# 3️⃣ Terceira geração — 1965–1980

## 🧩 3.1 Circuitos integrados

A terceira geração começou aproximadamente em **1965** e foi marcada pelos **circuitos integrados (ICs)**.

Esses componentes permitiam reunir vários elementos eletrônicos em um único chip.

### Impactos

- 📉 Redução do tamanho dos computadores
- 🚀 Aumento da capacidade de processamento
- 💾 Mais memória disponível
- 🔄 Execução de vários programas
- 🧠 Sistemas operacionais mais sofisticados

Com isso, os sistemas operacionais passaram a controlar uma quantidade muito maior de recursos.

---

## 🔄 3.2 Multiprogramação

A **multiprogramação** foi uma das maiores inovações dessa geração.

A ideia era manter vários programas na memória ao mesmo tempo.

### Exemplo

```text
Programa A → usando CPU
Programa B → esperando disco
Programa C → pronto para executar
Programa D → esperando entrada
```

Quando o Programa A precisasse esperar, o sistema poderia entregar a CPU ao Programa C.

### Resultado

> 🚀 **Maior utilização do processador e maior quantidade de trabalho executado em menos tempo.**

---

## ⚙️ 3.3 Processos

Com a multiprogramação, tornou-se importante definir o conceito de **processo**.

> **Processo:** programa que está atualmente em execução ou sendo gerenciado pelo sistema operacional.

### Estados básicos de um processo

| Estado | Significado |
|---|---|
| 🟢 **Executando** | Está utilizando a CPU |
| 🟡 **Pronto** | Está aguardando para utilizar a CPU |
| 🔴 **Bloqueado/esperando** | Aguarda algum recurso ou operação |

Fluxo simplificado:

```text
Pronto ───► Executando ───► Finalizado
  ▲             │
  │             ▼
  └──────── Esperando
```

---

## ⏱️ 3.4 Escalonamento

Quando vários processos estão prontos para executar, o sistema operacional precisa decidir **quem utilizará a CPU primeiro**.

Essa tarefa é realizada pelo **escalonador**.

### Objetivos do escalonamento

- 🚀 Manter a CPU ocupada
- ⏱️ Reduzir o tempo de resposta
- ⚖️ Distribuir recursos de maneira justa
- 📈 Aumentar a produtividade do sistema
- 🧑‍💻 Manter sistemas interativos responsivos

Esse conceito permanece essencial nos sistemas modernos.

---

## 👥 3.5 Compartilhamento de tempo

O **time-sharing** ou compartilhamento de tempo permitiu que diversos usuários interagissem com o mesmo computador.

A CPU alternava rapidamente entre os usuários e processos.

```text
CPU
 ├─► Usuário A → 20 ms
 ├─► Usuário B → 20 ms
 ├─► Usuário C → 20 ms
 └─► Usuário A → ...
```

Como essa alternância era rápida, cada usuário tinha a sensação de possuir o computador para si.

### Benefícios

- 💬 Interação em tempo real
- 👥 Atendimento a vários usuários
- ⚡ Melhor resposta
- 🧠 Melhor aproveitamento do computador

---

## 👤 3.6 Sistemas multiusuário

Os sistemas multiusuário permitiam que diferentes pessoas utilizassem a mesma máquina.

Isso exigiu mecanismos para:

- 🔐 autenticação;
- 📂 separar arquivos;
- 🧠 proteger a memória;
- ⚙️ distribuir recursos;
- 👮 controlar permissões.

Foi nesse contexto que segurança e isolamento começaram a ganhar importância ainda maior.

---

## 🖨️ 3.7 Spooling

**Spooling** é uma técnica utilizada para organizar operações lentas de entrada e saída.

Um exemplo clássico é a impressão.

```text
Programa
   ↓
Fila de impressão
   ↓
Armazenamento temporário
   ↓
Impressora
```

Enquanto a impressora trabalha, a CPU pode continuar executando outras tarefas.

### Vantagem principal

> ✅ Evita que o processador fique parado esperando dispositivos muito mais lentos.

---

# 🐧 UNIX

## 🏛️ 4.1 Surgimento

O **UNIX** surgiu durante a terceira geração e foi desenvolvido nos **Bell Labs**.

Ele se tornou um dos sistemas operacionais mais influentes da história.

Entre suas principais características estavam:

- 🧩 arquitetura modular;
- 🧰 ferramentas especializadas;
- ⌨️ forte uso de linha de comando;
- 👥 suporte multiusuário;
- 🔄 multitarefa;
- 📂 organização consistente de arquivos;
- 🌍 portabilidade.

---

## 🔤 4.2 Linguagem C

A linguagem **C** teve papel fundamental na evolução do UNIX.

Grande parte do sistema foi reescrita em C, reduzindo a dependência de uma única arquitetura de hardware.

### Antes e depois

| Antes | Com C |
|---|---|
| Código muito dependente da máquina | Maior portabilidade |
| Manutenção difícil | Código mais organizado |
| Reutilização limitada | Reutilização em outras arquiteturas |
| Forte uso de Assembly | Maior uso de linguagem de alto nível |

Essa combinação ajudou a transformar tanto o UNIX quanto a linguagem C em referências históricas.

---

## 🧰 4.3 Filosofia UNIX

A filosofia UNIX valorizava programas pequenos e especializados.

> 🧠 **“Faça uma coisa e faça-a bem.”**

Em vez de criar um único programa gigantesco, diferentes ferramentas podiam ser combinadas.

Exemplo conceitual:

```bash
comando1 | comando2 | comando3
```

Cada programa realiza uma função e sua saída pode servir de entrada para outro.

Essa ideia influenciou profundamente o desenvolvimento de software.

---

## 🌍 4.4 Influência do UNIX

A influência do UNIX pode ser observada em diversos sistemas e tecnologias.

| Sistema/tecnologia | Relação |
|---|---|
| BSD | Família diretamente relacionada ao UNIX |
| Linux | Inspirado em conceitos e filosofia UNIX |
| macOS | Possui base UNIX |
| Servidores | Forte presença de sistemas Unix-like |
| Terminais modernos | Herdam diversos conceitos e comandos |

Conceitos como **processos, permissões, arquivos, usuários e linha de comando** continuam presentes até hoje.

---

# 4️⃣ Quarta geração — 1980–presente

## 🧠 5.1 Microprocessadores

A quarta geração está diretamente relacionada à popularização dos **microprocessadores**.

O processador passou a ser integrado em um único chip, permitindo a criação de computadores menores e mais baratos.

### Consequências

- 🏠 Computadores chegando às residências
- 🏫 Expansão em escolas
- 🏢 Uso em pequenas empresas
- 💰 Redução dos custos
- 📈 Crescimento da indústria de software

---

## 🖥️ 5.2 Computadores pessoais

Os computadores pessoais transformaram completamente a relação entre pessoas e tecnologia.

Antes, computadores eram utilizados principalmente por grandes organizações. Com os PCs, indivíduos passaram a possuir suas próprias máquinas.

Isso aumentou a demanda por:

- 📝 editores de texto;
- 📊 planilhas;
- 🎮 jogos;
- 🗂️ gerenciadores de arquivos;
- 🌐 programas de comunicação;
- 🖼️ interfaces gráficas.

---

## 💾 5.3 CP/M

O **CP/M** foi um sistema operacional importante no início da era dos microcomputadores.

Ele fornecia recursos para:

- executar programas;
- manipular arquivos;
- controlar dispositivos;
- utilizar comandos.

Sua importância está ligada ao período de transição entre computadores especializados e computadores pessoais.

---

## ⌨️ 5.4 MS-DOS

O **MS-DOS** tornou-se um dos sistemas mais importantes no mercado de computadores compatíveis com o IBM PC.

Sua interface era baseada em comandos.

Exemplos típicos:

```text
DIR
CD
COPY
DEL
```

### Características

| Aspecto | MS-DOS |
|---|---|
| Interface | Linha de comando |
| Uso principal | Computadores pessoais |
| Estrutura | Relativamente simples |
| Importância | Grande base de software para PCs |
| Evolução histórica | Antecedeu a popularização do Windows |

---

## 🖥️ 5.5 IBM PC

O **IBM PC** teve papel fundamental na consolidação do mercado de computadores pessoais.

Sua arquitetura tornou-se uma referência e vários fabricantes passaram a produzir computadores compatíveis.

Isso criou um grande ecossistema de:

- 🧩 hardware;
- 💾 sistemas operacionais;
- 🎮 aplicações;
- 🖨️ periféricos;
- 📦 software comercial.

---

## 🪟 5.6 Interfaces gráficas

As interfaces gráficas mudaram profundamente a maneira de utilizar computadores.

### Antes

```text
Usuário → Digita comando → Sistema executa
```

### Depois

```text
Usuário
  ↓
🖱️ Mouse + 🪟 Janelas + 📁 Ícones + 📋 Menus
  ↓
Sistema operacional
```

A interface gráfica tornou o computador muito mais acessível a usuários sem conhecimento técnico.

---

## 🪟 5.7 Windows

O **Windows** tornou-se uma das principais plataformas para computadores pessoais.

Sua popularização esteve relacionada a:

- 🖼️ interface gráfica;
- 🧩 suporte a diferentes dispositivos;
- 📦 grande quantidade de programas;
- 🎮 jogos;
- 🏢 aplicações comerciais;
- 🌐 recursos de rede.

À medida que os computadores passaram a armazenar mais dados e se conectar à internet, o sistema também precisou evoluir em segurança.

---

## 🌐 5.8 Redes

A expansão das redes transformou os computadores em máquinas conectadas.

### Novas funções dos sistemas operacionais

| Recurso | Função |
|---|---|
| 🌐 Interface de rede | Enviar e receber dados |
| 📡 Protocolos | Padronizar comunicação |
| 📁 Compartilhamento | Acesso a arquivos e dispositivos |
| 🔐 Segurança | Proteger conexões e informações |
| 🌍 Internet | Acesso a serviços remotos |

A conectividade aumentou as possibilidades de uso, mas também ampliou os riscos de segurança.

---

# 5️⃣ Quinta geração — 1990–presente

## 📱 6.1 Computação móvel

A quinta geração está associada à expansão da computação móvel.

Entre os principais dispositivos estão:

- 💻 notebooks;
- 📱 smartphones;
- 📲 tablets;
- ⌚ dispositivos vestíveis;
- 🌐 equipamentos conectados.

A computação deixou de estar limitada a uma mesa e passou a acompanhar o usuário.

---

## 💻 6.2 Notebooks

Os notebooks mantêm características dos computadores pessoais, mas adicionam desafios relacionados à mobilidade.

O sistema operacional precisa administrar:

- 🔋 bateria;
- 📶 redes sem fio;
- 💤 suspensão e hibernação;
- 🌡️ temperatura;
- ⚙️ desempenho.

---

## 📱 6.3 Smartphones

Os smartphones ampliaram o conceito de computador móvel ao integrar diversos recursos em um único aparelho.

### Recursos comuns

| Recurso | Possível uso |
|---|---|
| 📷 Câmera | Fotos, vídeos e leitura visual |
| 🎙️ Microfone | Voz e áudio |
| 📍 GPS | Localização |
| 🧭 Giroscópio | Orientação |
| 📳 Acelerômetro | Movimento |
| 📶 Wi-Fi/5G | Comunicação |
| 🔐 Biometria | Autenticação |

O sistema operacional precisa controlar quais aplicativos podem utilizar cada recurso.

---

## 📲 6.4 Tablets

Os tablets combinam mobilidade com telas maiores.

A interação costuma ser realizada por toque, o que exige interfaces adaptadas para:

- 👆 gestos;
- ↔️ diferentes orientações;
- 📐 diferentes tamanhos de tela;
- 🔋 uso eficiente de energia;
- 📶 conectividade móvel.

---

## 🤖 6.5 Android

O **Android** tornou-se uma das principais plataformas móveis.

Ele utiliza o **kernel Linux** como parte de sua base e oferece recursos para:

- executar aplicativos;
- gerenciar memória;
- controlar processos;
- acessar sensores;
- administrar redes;
- controlar permissões.

### Modelo simplificado

```text
Aplicativo
   ↓
APIs do Android
   ↓
Serviços do sistema
   ↓
Kernel Linux
   ↓
Hardware
```

---

## 🍎 6.6 iOS

O **iOS** é o sistema operacional móvel desenvolvido pela Apple para seus dispositivos.

Uma de suas características é a forte integração entre hardware e software.

### Principais preocupações

- 🔋 eficiência energética;
- 🔐 segurança;
- 📱 experiência de uso;
- 🧩 integração com hardware;
- 🚫 isolamento entre aplicações;
- 🔑 controle de permissões.

---

## 🔋 6.7 Gerenciamento de energia

Em dispositivos móveis, energia é um recurso limitado.

O sistema operacional precisa equilibrar:

```text
⚡ Desempenho  ←──────────────→  🔋 Autonomia
```

### Técnicas utilizadas

- reduzir frequência do processador;
- suspender componentes não utilizados;
- limitar aplicações em segundo plano;
- desativar sensores quando possível;
- controlar atividades de rede.

---

## 📶 6.8 Redes sem fio

A mobilidade depende de redes sem fio.

Entre as tecnologias mais comuns estão:

- 📡 Wi-Fi;
- 📱 redes celulares;
- 🔵 Bluetooth;
- 📍 comunicação baseada em localização.

O sistema operacional precisa lidar com mudanças constantes de rede, sinal instável e diferentes velocidades.

---

## 🧭 6.9 Sensores

Os sensores aumentaram muito as possibilidades dos dispositivos móveis.

### Exemplos

| Sensor/recurso | Informação fornecida |
|---|---|
| 📍 GPS | Localização |
| 🧭 Giroscópio | Orientação |
| 📳 Acelerômetro | Movimento |
| 💡 Sensor de luz | Luminosidade |
| 📷 Câmera | Imagem |
| 🎙️ Microfone | Áudio |
| 👆 Tela sensível ao toque | Interação |

O sistema operacional atua como intermediário entre os aplicativos e esses recursos.

---

## 🔐 6.10 Segurança e privacidade

Nos dispositivos móveis, a segurança tornou-se ainda mais importante porque o aparelho pode armazenar:

- 💬 mensagens;
- 📸 fotos;
- 👥 contatos;
- 💳 informações financeiras;
- 📍 localização;
- 🔑 credenciais;
- 🎙️ dados de sensores.

Por isso, os sistemas modernos utilizam:

- permissões;
- isolamento entre aplicações;
- autenticação;
- criptografia;
- controle de acesso;
- atualizações de segurança.

---

# 📊 Comparação das cinco gerações

| Geração | Período | Tecnologia | Forma de uso | Principal avanço | Principal desafio |
|:--:|:--:|:--|:--|:--|:--|
| 🟤 **1ª** | 1945–1955 | Válvulas | Operação manual | Computação eletrônica | Tamanho, calor e falhas |
| 🔵 **2ª** | 1955–1965 | Transistores | Sistemas em lote | Automação de trabalhos | Falta de interatividade |
| 🟢 **3ª** | 1965–1980 | Circuitos integrados | Multiusuário | Multiprogramação | Gerenciar vários processos |
| 🟣 **4ª** | 1980–presente | Microprocessadores | Computador pessoal | Interfaces gráficas | Compatibilidade e redes |
| 🟠 **5ª** | 1990–presente | Computação móvel | Dispositivos móveis | Mobilidade | Energia, sensores e privacidade |

### 🔎 Evolução em uma frase

```text
Operação manual
      ↓
Processamento em lote
      ↓
Multiprogramação
      ↓
Computadores pessoais
      ↓
Computação móvel
```

---

# 🕒 Linha do tempo

| Período | Marco | Impacto |
|:--:|:--|:--|
| **1945–1955** | 🔌 Válvulas eletrônicas | Computadores enormes e operação manual |
| **1955–1965** | 🔹 Transistores | Máquinas menores, mais confiáveis e sistemas em lote |
| **1965–1980** | 🧩 Circuitos integrados | Multiprogramação, processos e time-sharing |
| **Década de 1970** | 🐧 UNIX | Portabilidade e forte influência em sistemas futuros |
| **Década de 1980** | 🖥️ PCs | Computadores chegando ao usuário comum |
| **Décadas de 1980–1990** | 🪟 Interfaces gráficas | Uso mais simples e visual |
| **Década de 1990** | 🌐 Internet | Computadores cada vez mais conectados |
| **2000 em diante** | 📱 Smartphones | Computação móvel em larga escala |
| **Atualidade** | ☁️ Mobilidade + nuvem + conectividade | Sistemas distribuídos, sensores, segurança e energia |

---

# ⚙️ Evolução das funções dos sistemas operacionais

A função dos sistemas operacionais aumentou progressivamente.

| Período | O que o sistema operacional passou a fazer |
|---|---|
| 🟤 1ª geração | Praticamente nada: operação majoritariamente manual |
| 🔵 2ª geração | Controlar trabalhos em lote |
| 🟢 3ª geração | Gerenciar processos, memória, usuários e CPU |
| 🟣 4ª geração | Oferecer interface gráfica, rede e suporte a aplicações |
| 🟠 5ª geração | Controlar energia, sensores, conectividade e permissões |

### 📈 Evolução resumida

```text
Operador humano
      ↓
Monitor residente
      ↓
Sistema multiprogramado
      ↓
Sistema gráfico e conectado
      ↓
Sistema móvel, seguro e inteligente
```

---

# 🔩 Relação entre hardware e software

A evolução dos sistemas operacionais não pode ser separada da evolução do hardware.

Cada avanço físico criou novas possibilidades de software.

| Hardware | Possibilidade criada |
|---|---|
| 🔌 Válvulas | Primeiros computadores eletrônicos |
| 🔹 Transistores | Máquinas menores e mais confiáveis |
| 🧩 Circuitos integrados | Maior capacidade e multiprogramação |
| 🧠 Microprocessadores | Computadores pessoais |
| 📱 Chips móveis | Smartphones e tablets |
| 🧭 Sensores | Aplicações contextuais e móveis |
| 📶 Redes sem fio | Computação conectada em qualquer lugar |

O sistema operacional atua como uma **camada de abstração**.

```text
👤 Usuário
    ↓
📦 Aplicações
    ↓
🧠 Sistema operacional
    ↓
🔩 Hardware
```

Isso significa que o usuário e os aplicativos não precisam controlar diretamente todos os componentes físicos.

---

# 🔄 Importância histórica da multiprogramação

A multiprogramação foi uma das mudanças mais importantes da história dos sistemas operacionais.

Antes dela:

```text
Programa esperando E/S
        ↓
CPU parada 😴
```

Com ela:

```text
Programa A esperando E/S
        ↓
CPU executa Programa B 🚀
```

### Principais consequências

- aumento da utilização da CPU;
- surgimento do gerenciamento de processos;
- necessidade de proteção de memória;
- desenvolvimento de escalonadores;
- aumento da complexidade do sistema operacional.

Esse princípio continua presente nos computadores atuais.

---

# ⏱️ Importância do compartilhamento de tempo

O compartilhamento de tempo transformou os computadores em sistemas mais interativos.

Antes, o usuário entregava um trabalho e aguardava.

Depois, passou a interagir diretamente com o sistema.

| Processamento em lote | Compartilhamento de tempo |
|---|---|
| Pouca interação | Interação direta |
| Espera maior | Respostas mais rápidas |
| Trabalhos sequenciais | Alternância entre usuários |
| Foco em processamento | Foco também em experiência de uso |

Essa evolução ajudou a estabelecer os sistemas multiusuário modernos.

---

# 🖥️ Importância dos computadores pessoais

Os computadores pessoais democratizaram o acesso à computação.

### Antes

- computadores caros;
- grandes instalações;
- uso institucional;
- poucos usuários.

### Depois

- computadores em residências;
- uso escolar;
- pequenas empresas;
- grande mercado de software;
- popularização de jogos, planilhas e editores.

O sistema operacional tornou-se uma **plataforma para o usuário comum**.

---

# 📱 Importância da computação móvel

A computação móvel levou os recursos digitais para praticamente qualquer lugar.

### Mudanças provocadas

| Antes | Computação móvel |
|---|---|
| Máquina fixa | Dispositivo transportável |
| Energia contínua | Bateria |
| Rede geralmente fixa | Redes sem fio |
| Poucos sensores | Muitos sensores |
| Uso em local específico | Uso durante deslocamentos |

Com isso, o sistema operacional passou a administrar novas variáveis, como bateria, conectividade, sensores e localização.

---

# 🔐 Segurança ao longo da história

A segurança ganhou importância conforme os computadores se tornaram compartilhados e conectados.

### 🟤 Primeiros computadores

- poucos usuários;
- ambientes controlados;
- pouca preocupação com ataques externos.

### 🟢 Sistemas multiusuário

- necessidade de separar usuários;
- permissões de arquivos;
- proteção de memória.

### 🌐 Era das redes

- comunicação entre máquinas;
- riscos de acesso remoto;
- programas maliciosos;
- necessidade de autenticação.

### 📱 Era móvel

- dados pessoais;
- localização;
- câmera;
- microfone;
- biometria;
- permissões de aplicativos.

### Evolução

```text
Proteção física
      ↓
Proteção entre usuários
      ↓
Proteção em rede
      ↓
Proteção de dados, identidade e privacidade
```

---

# ✅ Conclusão

A história dos sistemas operacionais representa uma evolução contínua da computação.

Os primeiros computadores exigiam grande quantidade de trabalho manual. A programação era realizada muito próxima do hardware, e o uso das máquinas era restrito a especialistas e grandes instituições.

Com a chegada dos **transistores**, os computadores tornaram-se menores e mais confiáveis. Os **sistemas em lote** começaram a automatizar a execução de trabalhos.

Posteriormente, os **circuitos integrados** permitiram computadores mais poderosos. A **multiprogramação**, os **processos**, o **escalonamento** e o **compartilhamento de tempo** transformaram a forma como os recursos eram utilizados.

O **UNIX** teve enorme influência ao introduzir uma filosofia modular, favorecer a portabilidade e consolidar conceitos que ainda aparecem em sistemas modernos.

Com os **microprocessadores**, os computadores pessoais tornaram-se acessíveis a milhões de pessoas. Interfaces gráficas, aplicações e redes passaram a fazer parte do cotidiano.

A computação móvel ampliou ainda mais essa transformação. Smartphones, tablets e notebooks exigiram novos mecanismos de gerenciamento de energia, sensores, redes sem fio, segurança e privacidade.

> 🎯 **Em resumo:** os sistemas operacionais evoluíram de simples mecanismos de controle da execução para plataformas complexas responsáveis por administrar praticamente toda a experiência computacional.

Mesmo após décadas de evolução, algumas responsabilidades continuam fundamentais:

- ⚙️ administrar processos;
- 🧠 controlar memória;
- 💾 organizar armazenamento;
- 🖥️ controlar dispositivos;
- 🌐 gerenciar comunicação;
- 🔐 proteger dados e recursos;
- 👤 oferecer uma interface entre usuário, aplicações e hardware.

A história mostra que **hardware e software evoluem juntos**. Cada nova geração cria novas possibilidades e, ao mesmo tempo, novos desafios que precisam ser resolvidos pelos sistemas operacionais.

---

# 🧾 Resumo das cinco gerações

## 🟤 Primeira geração — 1945–1955

**Tecnologia:** válvulas eletrônicas  
**Característica:** operação manual  
**Programação:** linguagem de máquina e Assembly  
**Problema principal:** tamanho, calor e baixa confiabilidade  

> 🔑 Palavra-chave: **manual**

---

## 🔵 Segunda geração — 1955–1965

**Tecnologia:** transistores  
**Característica:** processamento em lote  
**Programação:** linguagens de alto nível  
**Avanço:** monitores residentes  

> 🔑 Palavra-chave: **automação**

---

## 🟢 Terceira geração — 1965–1980

**Tecnologia:** circuitos integrados  
**Característica:** multiprogramação  
**Avanços:** processos, escalonamento, time-sharing e sistemas multiusuário  

> 🔑 Palavra-chave: **compartilhamento**

---

## 🟣 Quarta geração — 1980–presente

**Tecnologia:** microprocessadores  
**Característica:** computadores pessoais  
**Avanços:** interfaces gráficas, aplicações e redes  

> 🔑 Palavra-chave: **popularização**

---

## 🟠 Quinta geração — 1990–presente

**Tecnologia:** computação móvel  
**Característica:** smartphones, tablets e notebooks  
**Avanços:** sensores, redes sem fio, segurança e gerenciamento de energia  

> 🔑 Palavra-chave: **mobilidade**

---

# 🧠 Considerações finais

A evolução dos sistemas operacionais mostra como a computação passou de máquinas gigantescas e difíceis de utilizar para dispositivos compactos, conectados e presentes no cotidiano.

Essa evolução não aconteceu de uma única vez.

```text
Válvulas
   ↓
Transistores
   ↓
Circuitos integrados
   ↓
Microprocessadores
   ↓
Dispositivos móveis
```

Paralelamente, o software também evoluiu:

```text
Operação manual
   ↓
Sistemas em lote
   ↓
Multiprogramação
   ↓
Interfaces gráficas
   ↓
Computação móvel e conectada
```

Conceitos como **processos, escalonamento, memória, arquivos, segurança e abstração** foram desenvolvidos para resolver problemas concretos de cada época.

Muitos desses conceitos continuam sendo utilizados atualmente, ainda que em sistemas muito mais complexos.

Estudar essa evolução permite compreender não apenas **como os sistemas operacionais surgiram**, mas também **por que eles funcionam da maneira como funcionam hoje**.

> 🚀 A computação continuará evoluindo, e os sistemas operacionais continuarão tendo a mesma missão fundamental: **administrar recursos, facilitar a interação e permitir que hardware e software trabalhem juntos de forma eficiente e segura.**

---

# 📚 Referência bibliográfica

**TANENBAUM, Andrew S.; BOS, Herbert.** *Modern Operating Systems*. 4. ed. Pearson, 2015.

### 📖 Seção utilizada como base

**Chapter 1 — Introduction**  
**Section 1.2 — History of Operating Systems**

### 📑 Subseções abordadas

- *The First Generation (1945–55): Vacuum Tubes*
- *The Second Generation (1955–65): Transistors and Batch Systems*
- *The Third Generation (1965–1980): ICs and Multiprogramming*
- *The Fourth Generation (1980–Present): Personal Computers*
- *The Fifth Generation (1990–Present): Mobile Computers*

---

<div align="center">

### 💻 História dos Sistemas Operacionais

**Do hardware manual à computação móvel.**

</div>
