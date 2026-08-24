# 🧬 Sistemas Operacionais Baseados em Outros Sistemas

> **Atividade de Sistemas Operacionais**  
> **Tema:** sistemas derivados, reutilização de kernel, arquitetura e estrutura de outros sistemas operacionais.

---

## 📚 Sumário

1. [Introdução](#-introdução)
2. [O que significa um sistema ser baseado em outro?](#-o-que-significa-um-sistema-ser-baseado-em-outro)
3. [Visão geral dos 5 sistemas pesquisados](#-visão-geral-dos-5-sistemas-pesquisados)
4. [Ubuntu e Debian](#1️⃣-ubuntu--baseado-no-debian)
5. [Kali Linux e Debian](#2️⃣-kali-linux--baseado-no-debian)
6. [Pop!_OS e Ubuntu](#3️⃣-pop_os--baseado-no-ubuntu)
7. [Android e Linux](#4️⃣-android--utiliza-o-kernel-linux)
8. [SteamOS 3 e Arch Linux](#5️⃣-steamos-3--baseado-no-arch-linux)
9. [Tabela comparativa geral](#-tabela-comparativa-geral)
10. [Comparação por características](#-comparação-por-características)
11. [Relação entre os sistemas](#-relação-entre-os-sistemas)
12. [Vantagens de utilizar outro sistema como base](#-vantagens-de-utilizar-outro-sistema-como-base)
13. [Desvantagens e desafios](#-desvantagens-e-desafios)
14. [Conclusão](#-conclusão)
15. [Referências](#-referências)

---

# 📖 Introdução

No desenvolvimento de sistemas operacionais, nem sempre é necessário criar todos os componentes a partir do zero.

Muitos sistemas modernos aproveitam tecnologias já existentes, utilizando como base:

- 🧠 **kernel**;
- 📦 sistema de pacotes;
- 🗂️ organização de arquivos;
- 🔌 drivers;
- ⚙️ bibliotecas;
- 🏗️ arquitetura;
- 🧰 ferramentas;
- 📚 repositórios de software.

Essa reutilização permite que novos sistemas sejam desenvolvidos para objetivos específicos sem que seus criadores precisem reconstruir toda a infraestrutura de baixo nível.

Um sistema pode, por exemplo, utilizar o **kernel de outro sistema**, aproveitar seus pacotes e ferramentas e, ao mesmo tempo, possuir interface, programas, configurações e objetivos completamente diferentes.

Nesta pesquisa foram analisados cinco exemplos:

| # | Sistema pesquisado | Sistema/base utilizada | Tipo de relação |
|:--:|---|---|---|
| 1️⃣ | 🟠 **Ubuntu** | Debian | Distribuição derivada |
| 2️⃣ | 🐉 **Kali Linux** | Debian | Distribuição derivada |
| 3️⃣ | 🚀 **Pop!_OS** | Ubuntu | Distribuição derivada |
| 4️⃣ | 🤖 **Android** | Linux | Utilização do kernel Linux |
| 5️⃣ | 🎮 **SteamOS 3** | Arch Linux | Distribuição derivada |

> 🎯 **Objetivo da pesquisa:** compreender como sistemas operacionais podem reutilizar uma base existente e, ainda assim, apresentar características, públicos e finalidades diferentes.

---

# 🧩 O que significa um sistema ser baseado em outro?

Um sistema ser **baseado em outro** não significa necessariamente que os dois sejam iguais.

O novo sistema pode aproveitar partes importantes de um projeto anterior e modificar diversas outras.

## 🔎 Elementos que podem ser reutilizados

| Elemento | Função |
|---|---|
| 🧠 **Kernel** | Gerencia CPU, memória, processos e hardware |
| 📦 **Sistema de pacotes** | Instala e atualiza programas |
| 📚 **Repositórios** | Disponibilizam softwares |
| 🗂️ **Estrutura de diretórios** | Organiza arquivos do sistema |
| 🔌 **Drivers** | Permitem comunicação com o hardware |
| 🧰 **Ferramentas** | Oferecem comandos e utilitários |
| 🏗️ **Arquitetura** | Define a organização geral do sistema |
| 🔐 **Mecanismos de segurança** | Controlam usuários e permissões |

---

## 🌱 Upstream e downstream

Dois termos importantes nesse assunto são **upstream** e **downstream**.

### ⬆️ Upstream

É o projeto que serve como fonte original para outro projeto.

### ⬇️ Downstream

É o projeto que recebe, adapta ou modifica componentes do projeto original.

Exemplo:

```text
Debian
  │
  ├──► Ubuntu
  │      │
  │      └──► Pop!_OS
  │
  └──► Kali Linux
```

Nesse exemplo:

- Debian é **upstream** em relação ao Ubuntu;
- Ubuntu é **downstream** de Debian;
- Pop!_OS é downstream de Ubuntu;
- Kali também utiliza Debian como sua base.

---

# 🔭 Visão geral dos 5 sistemas pesquisados

| Sistema | Base | Principal finalidade | Principal diferença em relação à base |
|---|---|---|---|
| 🟠 **Ubuntu** | Debian | Desktop, servidores e nuvem | Ciclo próprio de lançamentos, foco em facilidade e suporte comercial |
| 🐉 **Kali Linux** | Debian Testing | Segurança da informação | Ferramentas e configurações voltadas a testes de segurança |
| 🚀 **Pop!_OS** | Ubuntu | Desktop e produtividade | Interface própria e otimizações da System76 |
| 🤖 **Android** | Kernel Linux | Smartphones, tablets e dispositivos embarcados | Arquitetura móvel, framework próprio e ambiente de aplicativos |
| 🎮 **SteamOS 3** | Arch Linux | Jogos e dispositivos como Steam Deck | Interface voltada a jogos, integração com Steam e Proton |

---

# 1️⃣ Ubuntu — baseado no Debian

## 🟠 O que é o Ubuntu?

O **Ubuntu** é uma distribuição Linux mantida pela Canonical e pela comunidade Ubuntu.

Ele utiliza o **Debian** como uma de suas principais bases tecnológicas.

A própria documentação do Ubuntu afirma que o sistema é derivado do Debian e importa muitos pacotes e mudanças do projeto Debian.

### 🌳 Relação

```text
GNU/Linux
   ↓
Debian
   ↓
Ubuntu
```

---

## 🧱 O que o Ubuntu aproveita do Debian?

O Ubuntu utiliza diversos elementos provenientes do Debian, como:

- 📦 formato de pacotes `.deb`;
- 🧰 ferramentas `dpkg`;
- 📥 gerenciador de pacotes APT;
- 📚 grande quantidade de pacotes;
- 🗂️ estrutura típica de sistemas GNU/Linux;
- 🧠 kernel Linux;
- 🔐 modelo de usuários e permissões;
- 🖥️ diversas ferramentas de software livre.

---

## 🔄 Como os pacotes chegam ao Ubuntu?

Grande parte dos pacotes do Ubuntu possui relação com o Debian.

De maneira simplificada:

```text
Projeto original
      ↓
   Debian
      ↓
Sincronização / adaptação
      ↓
   Ubuntu
```

Em alguns casos, o Ubuntu utiliza o pacote praticamente sem alterações.

Em outros, a equipe do Ubuntu adiciona modificações próprias.

---

## 🆚 Ubuntu × Debian

| Característica | 🟠 Ubuntu | 🔴 Debian |
|---|---|---|
| Base | Derivado do Debian | Projeto independente |
| Pacotes | `.deb` | `.deb` |
| Gerenciador | APT/dpkg | APT/dpkg |
| Kernel | Linux | Linux |
| Público | Desktop, servidor, nuvem e empresas | Uso geral e grande variedade de ambientes |
| Lançamentos | Ciclo definido pelo Ubuntu | Ciclo próprio do Debian |
| Suporte comercial | Canonical | Projeto comunitário, com empresas externas oferecendo serviços |
| Configurações padrão | Mais direcionadas ao Ubuntu | Mais neutras e flexíveis |
| Interface desktop padrão | Definida pelo Ubuntu Desktop | Diversas opções disponíveis |

---

## 💡 Principal diferença

O Ubuntu não é apenas uma cópia do Debian.

Ele utiliza Debian como fundação, mas possui:

- ciclo de lançamentos próprio;
- repositórios próprios;
- decisões de projeto próprias;
- identidade visual própria;
- configurações padrão diferentes;
- suporte oferecido pela Canonical;
- foco específico em determinados públicos e plataformas.

> ✅ **Resumo:** o Debian fornece uma fundação importante, enquanto o Ubuntu adapta essa base para seus próprios objetivos.

---

# 2️⃣ Kali Linux — baseado no Debian

## 🐉 O que é o Kali Linux?

O **Kali Linux** é uma distribuição Linux desenvolvida principalmente para atividades relacionadas à **segurança da informação**.

Entre seus usos estão:

- 🔎 testes de segurança;
- 🛡️ auditorias;
- 🧪 testes de penetração;
- 🔬 análise forense;
- 🐞 pesquisa de vulnerabilidades;
- 🔧 engenharia reversa.

O projeto Kali informa oficialmente que a distribuição é baseada no **Debian Testing**.

---

## 🌳 Relação

```text
GNU/Linux
   ↓
Debian
   ↓
Debian Testing
   ↓
Kali Linux
```

---

## 🧱 O que o Kali aproveita do Debian?

Entre os elementos herdados estão:

- 🧠 kernel Linux;
- 📦 pacotes `.deb`;
- 📥 APT;
- ⚙️ infraestrutura de pacotes;
- 🗂️ estrutura típica do sistema;
- 🔐 sistema de usuários e permissões;
- 📚 grande parte dos pacotes do Debian.

A documentação do Kali explica que muitos pacotes são importados dos repositórios Debian.

---

## 🛡️ O que o Kali adiciona?

O Kali modifica essa base para oferecer um sistema especializado em segurança.

Ele acrescenta:

- 🧰 ferramentas de segurança;
- 🔍 softwares de análise;
- 🕵️ ferramentas forenses;
- 📡 utilitários de redes;
- 🐞 ferramentas de testes de vulnerabilidades;
- ⚙️ configurações próprias;
- 📦 pacotes específicos do projeto Kali.

---

## 🆚 Kali Linux × Debian

| Característica | 🐉 Kali Linux | 🔴 Debian |
|---|---|---|
| Base | Debian Testing | Projeto principal |
| Objetivo | Segurança e pentest | Uso geral |
| Pacotes | `.deb` | `.deb` |
| Gerenciamento | APT/dpkg | APT/dpkg |
| Atualizações | Modelo rolling do Kali | Ciclos e ramificações próprios |
| Softwares padrão | Muitas ferramentas de segurança | Conjunto de uso geral |
| Público | Profissionais e estudantes de segurança | Público amplo |
| Configuração | Especializada | Generalista |
| Foco | Auditoria e segurança | Estabilidade, liberdade e uso geral |

---

## 🎯 Exemplo prático

Um usuário Debian pode instalar ferramentas de segurança manualmente.

No Kali, muitas delas já fazem parte do ecossistema da distribuição.

```text
Debian
   ↓
Sistema de uso geral
   ↓
Usuário escolhe ferramentas
```

```text
Kali
   ↓
Base Debian
   +
Ferramentas e configurações de segurança
```

> ✅ **Resumo:** o Kali aproveita a infraestrutura do Debian, mas muda completamente o foco da distribuição.

---

# 3️⃣ Pop!_OS — baseado no Ubuntu

## 🚀 O que é o Pop!_OS?

O **Pop!_OS** é uma distribuição Linux desenvolvida pela **System76**.

O sistema começou utilizando o Ubuntu como base e continua aproveitando seus repositórios e sua infraestrutura de pacotes.

A System76 afirma que o Pop!_OS utiliza os repositórios Ubuntu como importante fonte de softwares.

---

## 🌳 Relação

```text
Debian
   ↓
Ubuntu
   ↓
Pop!_OS
```

Esse exemplo mostra que um sistema derivado também pode se tornar a base para outro.

---

## 🧱 O que o Pop!_OS aproveita do Ubuntu?

Entre os elementos utilizados estão:

- 🧠 kernel Linux;
- 📦 pacotes `.deb`;
- 📥 APT;
- 📚 grande parte dos repositórios do Ubuntu;
- 🔌 suporte de hardware presente no ecossistema Ubuntu;
- 🗂️ estrutura de sistema GNU/Linux.

---

## ✨ O que o Pop!_OS modifica?

O Pop!_OS possui várias decisões próprias de projeto.

Entre elas estão:

- 🖥️ ambiente de desktop **COSMIC** nas versões atuais;
- 🎨 identidade visual própria;
- ⚡ gerenciamento e perfis de energia;
- 🎮 atenção especial a GPUs;
- 🔌 integração com hardware System76;
- 📦 repositórios próprios para determinados componentes;
- 🧰 ferramentas próprias de gerenciamento.

---

## 🆚 Pop!_OS × Ubuntu

| Característica | 🚀 Pop!_OS | 🟠 Ubuntu |
|---|---|---|
| Base | Ubuntu | Debian |
| Desenvolvedor principal | System76 | Canonical + comunidade |
| Pacotes | `.deb` e outras formas suportadas | `.deb` e outras formas suportadas |
| Gerenciador de base | APT/dpkg | APT/dpkg |
| Kernel | Linux | Linux |
| Interface padrão | COSMIC nas versões atuais | Ubuntu Desktop |
| Foco | Desktop, produtividade e hardware System76 | Desktop, servidores, nuvem e outras plataformas |
| Repositórios | Ubuntu + componentes próprios | Repositórios Ubuntu |
| Hardware | Otimizações específicas da System76 | Ampla variedade de fabricantes |

---

## 🔗 Cadeia de derivação

O Pop!_OS é especialmente interessante porque mostra uma cadeia com três níveis:

```text
Debian
  │
  ▼
Ubuntu
  │
  ▼
Pop!_OS
```

Cada projeto reutiliza tecnologias anteriores, mas cria sua própria identidade.

> ✅ **Resumo:** Pop!_OS mantém forte compatibilidade com o ecossistema Ubuntu, mas modifica a experiência de desktop e adiciona tecnologias próprias.

---

# 4️⃣ Android — utiliza o kernel Linux

## 🤖 O que é o Android?

O **Android** é um sistema operacional voltado principalmente para dispositivos móveis.

Ele é utilizado em:

- 📱 smartphones;
- 📲 tablets;
- 📺 televisores;
- 🚘 sistemas automotivos;
- ⌚ dispositivos vestíveis;
- 📦 outros dispositivos embarcados.

Sua arquitetura utiliza o **kernel Linux** como base de baixo nível.

---

## ⚠️ Uma diferença importante

É incorreto afirmar simplesmente que:

> “Android é uma distribuição Linux igual ao Ubuntu.”

O Android utiliza o kernel Linux, mas possui uma arquitetura de espaço de usuário muito diferente das distribuições GNU/Linux tradicionais.

### Relação simplificada

```text
Kernel Linux
     ↓
Kernel comum do Android
     ↓
Camadas específicas do Android
     ↓
Framework Android
     ↓
Aplicativos
```

---

## 🧠 O que o Android utiliza do Linux?

O kernel Linux fornece funções essenciais como:

- ⚙️ escalonamento de processos;
- 💾 gerenciamento de memória;
- 🔌 suporte a drivers;
- 🔐 isolamento e segurança;
- 🌐 recursos de rede;
- 📂 recursos de armazenamento;
- 🧵 gerenciamento de tarefas;
- 🔋 suporte de baixo nível ao hardware.

A documentação do Android Open Source Project informa que o kernel Android é baseado em kernels Linux LTS, combinados com modificações específicas do Android.

---

## 🏗️ O que o Android adiciona?

Sobre essa base, o Android possui uma arquitetura própria.

Entre seus elementos estão:

- 📱 framework Android;
- 🔗 HAL — Hardware Abstraction Layer;
- ⚙️ serviços de sistema;
- 🧩 Binder IPC;
- ☕ Android Runtime;
- 🔐 sandbox de aplicativos;
- 📦 sistema próprio de aplicativos;
- 👆 interface voltada a toque;
- 🔋 mecanismos específicos de gerenciamento de energia.

---

## 🆚 Android × Linux tradicional

| Característica | 🤖 Android | 🐧 GNU/Linux tradicional |
|---|---|---|
| Base de kernel | Linux com adaptações Android | Linux |
| Objetivo principal | Dispositivos móveis e embarcados | Desktop, servidor, embarcados e outros |
| Interface | Touch e interfaces móveis | Varia conforme distribuição |
| Aplicativos | Ecossistema Android | Pacotes e formatos da distribuição |
| Ambiente de execução | Android Runtime e componentes próprios | Ferramentas GNU, bibliotecas e runtimes variados |
| Hardware | Smartphones, tablets, TV etc. | PCs, servidores, embarcados etc. |
| IPC | Forte uso do Binder | Mecanismos Unix/Linux tradicionais |
| Gerenciamento de apps | Sandbox e permissões Android | Usuários, permissões, contêineres etc. |
| Kernel | Derivado de Linux LTS com patches Android | Linux upstream ou versões mantidas pela distribuição |

---

## 🔐 Segurança herdada e adaptada

O Android aproveita mecanismos do Linux como isolamento de processos e permissões.

Porém, adapta esse modelo ao funcionamento dos aplicativos móveis.

Por exemplo:

```text
App A
  ↓
Processo isolado
  ↓
Permissões
```

```text
App B
  ↓
Outro processo isolado
  ↓
Outras permissões
```

Essa arquitetura evita que um aplicativo possua acesso irrestrito aos dados de outro.

---

## 💡 Por que utilizar Linux como kernel?

Criar um kernel completo do zero exigiria desenvolver:

- gerenciamento de memória;
- escalonamento;
- rede;
- drivers;
- processos;
- segurança;
- suporte a diversas arquiteturas.

Ao utilizar Linux, o Android pôde aproveitar uma base já madura e concentrar o desenvolvimento nas camadas necessárias para dispositivos móveis.

> ✅ **Resumo:** o Android utiliza o kernel Linux, mas constrói sobre ele uma plataforma muito diferente de uma distribuição GNU/Linux convencional.

---

# 5️⃣ SteamOS 3 — baseado no Arch Linux

## 🎮 O que é o SteamOS?

O **SteamOS** é um sistema operacional desenvolvido pela Valve com foco em jogos.

A geração atual do sistema, **SteamOS 3**, utiliza o **Arch Linux** como base.

Ele é conhecido principalmente por sua utilização no **Steam Deck** e em dispositivos compatíveis com SteamOS.

---

## 🌳 Relação

```text
GNU/Linux
   ↓
Arch Linux
   ↓
SteamOS 3
```

> ℹ️ **Observação histórica:** versões antigas do SteamOS utilizavam Debian. O SteamOS 3 adotou uma base Arch Linux.

---

## 🧱 O que o SteamOS aproveita do Arch?

Entre os elementos relacionados à base Arch estão:

- 🧠 kernel Linux;
- 📦 ecossistema de pacotes Linux da base Arch;
- 🗂️ estrutura do sistema;
- 🔌 drivers Linux;
- 📚 componentes do ecossistema Arch;
- 🖥️ ferramentas GNU/Linux.

---

## 🎯 O que a Valve adiciona?

O SteamOS modifica a base para criar uma experiência voltada a jogos.

Entre os principais componentes estão:

- 🎮 interface do Steam;
- 🕹️ modo de jogo;
- 🪟 modo desktop;
- 🔄 sistema de atualizações controlado pela Valve;
- 🧪 camada de compatibilidade **Proton**;
- 🎨 ambiente KDE Plasma no modo desktop;
- ⚡ otimizações para dispositivos de jogos;
- 🎛️ integração com controles e hardware do Steam Deck.

---

## 🎮 Proton

O Proton é uma tecnologia importante no SteamOS porque permite executar muitos jogos criados originalmente para Windows.

Fluxo simplificado:

```text
Jogo para Windows
       ↓
     Proton
       ↓
SteamOS / Linux
       ↓
    Hardware
```

Isso ajuda a transformar o SteamOS em uma plataforma de jogos mesmo quando o software original não possui versão nativa para Linux.

---

## 🆚 SteamOS 3 × Arch Linux

| Característica | 🎮 SteamOS 3 | 🔵 Arch Linux |
|---|---|---|
| Base | Arch Linux | Projeto principal |
| Objetivo | Jogos e dispositivos de sala/portáteis | Distribuição Linux de propósito geral |
| Interface padrão | Experiência Steam + KDE no desktop | Usuário escolhe e configura |
| Configuração | Pronta para jogar | Instalação e configuração mais manual |
| Público | Jogadores | Usuários que desejam grande controle |
| Atualizações | Controladas e testadas pela Valve | Rolling release do Arch |
| Compatibilidade com jogos | Proton fortemente integrado | Pode ser instalado/configurado pelo usuário |
| Hardware | Forte integração com dispositivos Steam | Grande variedade de hardware |

---

## 🎯 Diferença de filosofia

O Arch Linux normalmente oferece ao usuário uma base relativamente mínima para que ele monte seu próprio ambiente.

O SteamOS segue uma abordagem diferente:

```text
Arch Linux
   ↓
Base flexível
   ↓
Usuário configura o ambiente
```

```text
SteamOS
   ↓
Base Arch
   +
Configurações Valve
   +
Steam
   +
Proton
   +
Interface de console
```

> ✅ **Resumo:** a Valve utiliza a flexibilidade do Arch Linux como base, mas entrega uma experiência pronta e fortemente direcionada a jogos.

---

# 📊 Tabela comparativa geral

| Sistema pesquisado | Sistema base | O que foi aproveitado? | O que foi modificado/adicionado? | Público principal |
|---|---|---|---|---|
| 🟠 **Ubuntu** | Debian | Pacotes `.deb`, APT, infraestrutura e grande parte do ecossistema | Ciclo próprio, configurações, interface, repositórios e suporte Canonical | Usuários domésticos, empresas e servidores |
| 🐉 **Kali Linux** | Debian Testing | Pacotes, APT, kernel e estrutura Debian | Ferramentas e configurações para segurança | Profissionais e estudantes de segurança |
| 🚀 **Pop!_OS** | Ubuntu | Repositórios, pacotes e infraestrutura Ubuntu | COSMIC, ferramentas e otimizações System76 | Usuários desktop e profissionais |
| 🤖 **Android** | Kernel Linux | Kernel, processos, memória, drivers, rede e segurança | Framework Android, HAL, Binder, Runtime e interface móvel | Dispositivos móveis e embarcados |
| 🎮 **SteamOS 3** | Arch Linux | Kernel e base GNU/Linux/Arch | Steam, Proton, modo de jogo, integração com hardware | Jogadores |

---

# 🔬 Comparação por características

## 🧠 Kernel

| Sistema | Kernel |
|---|---|
| 🟠 Ubuntu | Linux |
| 🐉 Kali Linux | Linux |
| 🚀 Pop!_OS | Linux |
| 🤖 Android | Linux com adaptações específicas do Android |
| 🎮 SteamOS 3 | Linux |

Todos os sistemas pesquisados possuem relação com o kernel Linux.

Porém, isso não significa que todos possuam a mesma arquitetura completa.

O Android é o exemplo mais diferente, pois utiliza Linux principalmente como núcleo e constrói sobre ele uma plataforma própria para dispositivos móveis.

---

## 📦 Pacotes e aplicativos

| Sistema | Forma principal de distribuição de software |
|---|---|
| 🟠 Ubuntu | Pacotes Debian e outros formatos suportados |
| 🐉 Kali Linux | Pacotes Debian |
| 🚀 Pop!_OS | Pacotes Debian e formatos adicionais suportados |
| 🤖 Android | Aplicativos Android |
| 🎮 SteamOS | Steam + componentes Linux |

---

## 🎯 Finalidade

```text
Ubuntu    → Uso geral
Kali      → Segurança
Pop!_OS   → Desktop/produtividade
Android   → Dispositivos móveis
SteamOS   → Jogos
```

Essa comparação mostra como uma base tecnológica semelhante pode ser adaptada para objetivos muito diferentes.

---

# 🌳 Relação entre os sistemas

## Diagrama de derivação

```text
                           ┌─────────────┐
                           │ Linux Kernel│
                           └──────┬──────┘
                                  │
            ┌─────────────────────┼────────────────────┐
            │                     │                    │
            ▼                     ▼                    ▼
        ┌────────┐            ┌────────┐           Android
        │ Debian │            │  Arch  │
        └───┬────┘            └───┬────┘
            │                     │
      ┌─────┴──────┐              ▼
      │            │          SteamOS 3
      ▼            ▼
   Ubuntu         Kali
      │
      ▼
   Pop!_OS
```

> 💡 O diagrama é simplificado. Ele representa a relação de base analisada nesta atividade, e não toda a genealogia de cada componente.

---

## 🔄 Herança de tecnologias

Um exemplo interessante é a relação:

```text
Debian
   ↓
Ubuntu
   ↓
Pop!_OS
```

O Pop!_OS pode receber indiretamente tecnologias originadas no Debian por meio do Ubuntu.

Isso demonstra como projetos de software livre podem formar grandes cadeias de colaboração.

---

# ✅ Vantagens de utilizar outro sistema como base

Criar um sistema sobre uma base existente possui várias vantagens.

## 1. 🧠 Kernel já desenvolvido

Um kernel moderno possui milhões de linhas de código e precisa controlar:

- memória;
- processos;
- CPU;
- drivers;
- rede;
- armazenamento;
- segurança.

Reaproveitar um kernel existente reduz enormemente o trabalho necessário.

---

## 2. 🔌 Drivers existentes

Um sistema baseado em Linux pode aproveitar suporte já existente para grande quantidade de hardware.

Isso inclui:

- placas de vídeo;
- placas de rede;
- armazenamento;
- USB;
- áudio;
- processadores.

---

## 3. 📦 Ecossistema de softwares

Distribuições derivadas podem aproveitar milhares de pacotes já existentes.

Exemplo:

```text
Debian
  ↓
Milhares de pacotes
  ↓
Ubuntu reutiliza/adapta
  ↓
Pop!_OS também pode aproveitar o ecossistema
```

---

## 4. 🔐 Correções de segurança

Quando o projeto base recebe correções, sistemas derivados podem incorporar essas melhorias.

Isso cria uma relação de cooperação entre projetos.

---

## 5. 🚀 Desenvolvimento mais rápido

Em vez de desenvolver tudo novamente, a equipe pode concentrar esforços em seu diferencial.

| Projeto | Pode concentrar esforços em |
|---|---|
| Ubuntu | Facilidade de uso, servidores e suporte |
| Kali | Segurança |
| Pop!_OS | Experiência desktop |
| Android | Mobilidade e aplicativos |
| SteamOS | Jogos |

---

# ⚠️ Desvantagens e desafios

Utilizar outro sistema como base também cria desafios.

## 🔗 Dependência do projeto original

Mudanças realizadas no projeto base podem afetar o sistema derivado.

Exemplo:

```text
Projeto base muda biblioteca
        ↓
Sistema derivado precisa adaptar pacotes
```

---

## 🔀 Manutenção de alterações próprias

Quanto mais um sistema modifica a base, mais trabalho pode ser necessário para incorporar atualizações futuras.

---

## 🐞 Compatibilidade

Uma atualização upstream pode apresentar incompatibilidade com:

- drivers;
- aplicações;
- interfaces;
- modificações próprias;
- ferramentas específicas.

---

## 🔐 Segurança

O sistema derivado precisa acompanhar:

- vulnerabilidades da própria base;
- vulnerabilidades de componentes adicionados;
- correções do kernel;
- atualizações de pacotes.

---

# 🧠 O que os cinco exemplos demonstram?

Os sistemas pesquisados mostram diferentes níveis de reutilização.

| Nível | Exemplo | Relação |
|---|---|---|
| 📦 Distribuição derivada | Ubuntu → Debian | Reutiliza grande parte da infraestrutura |
| 🎯 Distribuição especializada | Kali → Debian | Mantém a base e muda o objetivo |
| 🌿 Derivação em cadeia | Pop!_OS → Ubuntu → Debian | Um derivado se torna base de outro |
| 🧠 Reutilização do kernel | Android → Linux | Utiliza o núcleo, mas cria arquitetura própria |
| 🎮 Adaptação para produto | SteamOS → Arch | Transforma uma base geral em plataforma de jogos |

---

# 🎯 Resposta direta à atividade

## 1. Cinco sistemas que utilizam ou se baseiam em outros sistemas

1. 🟠 **Ubuntu**, baseado no Debian;
2. 🐉 **Kali Linux**, baseado no Debian Testing;
3. 🚀 **Pop!_OS**, baseado no Ubuntu;
4. 🤖 **Android**, que utiliza o kernel Linux como base;
5. 🎮 **SteamOS 3**, baseado no Arch Linux.

---

## 2. Principais diferenças

### 🟠 Ubuntu × Debian

O Ubuntu utiliza a infraestrutura do Debian, mas possui ciclo de lançamentos, repositórios, configurações e suporte próprios.

### 🐉 Kali × Debian

O Kali mantém a base Debian, porém direciona o sistema para segurança da informação e inclui ferramentas especializadas.

### 🚀 Pop!_OS × Ubuntu

O Pop!_OS utiliza os repositórios e tecnologias Ubuntu, mas oferece ambiente de desktop, ferramentas e otimizações próprias da System76.

### 🤖 Android × Linux

O Android utiliza o kernel Linux para controlar os recursos de hardware, mas possui framework, APIs, runtime e modelo de aplicações próprios.

### 🎮 SteamOS × Arch Linux

O SteamOS utiliza Arch Linux como base, mas é configurado pela Valve como uma plataforma pronta para jogos, com Steam, Proton e uma interface específica.

---

# ✅ Conclusão

A pesquisa demonstra que um sistema operacional não precisa ser desenvolvido completamente do zero para apresentar características próprias.

Projetos como **Ubuntu, Kali Linux, Pop!_OS e SteamOS** aproveitam distribuições já existentes e modificam essa base de acordo com seus objetivos.

O **Android** apresenta um caso diferente: ele utiliza o **kernel Linux** como fundação, mas desenvolve uma arquitetura própria sobre esse núcleo.

Essa reutilização oferece várias vantagens.

Os desenvolvedores podem aproveitar:

- kernels maduros;
- suporte a hardware;
- drivers;
- ferramentas;
- bibliotecas;
- sistemas de pacotes;
- correções de segurança;
- comunidades já estabelecidas.

Ao mesmo tempo, cada projeto pode concentrar seus esforços naquilo que o torna diferente.

```text
Base existente
      +
Modificações
      +
Objetivo específico
      =
Novo sistema
```

Os cinco casos pesquisados mostram que a reutilização é uma característica importante da evolução dos sistemas operacionais.

O Debian tornou-se base para diversas distribuições. O Ubuntu, que já é derivado do Debian, também se tornou base para outros projetos, como o Pop!_OS. O Arch Linux é utilizado pelo SteamOS 3 para construir uma plataforma voltada a jogos. Já o Linux fornece ao Android um kernel capaz de gerenciar os recursos fundamentais do hardware.

> 🎓 **Portanto, sistemas derivados demonstram como projetos podem compartilhar uma mesma base tecnológica e, mesmo assim, possuir interfaces, objetivos, públicos e arquiteturas diferentes.**

---

# 📚 Referências

## 🟠 Ubuntu

**Ubuntu — Debian**  
Documentação oficial do projeto Ubuntu:  
<https://ubuntu.com/community/docs/governance/debian>

**Ubuntu Project — Merges & Syncs**  
Explica como o Ubuntu importa e adapta mudanças do Debian:  
<https://documentation.ubuntu.com/project/how-ubuntu-is-made/processes/merges-and-syncs/>

---

## 🐉 Kali Linux

**Kali Linux — What is Kali Linux?**  
Documentação oficial:  
<https://www.kali.org/docs/introduction/what-is-kali-linux/>

**Kali's Relationship With Debian**  
Documentação oficial sobre a relação com Debian Testing:  
<https://www.kali.org/docs/policy/kali-linux-relationship-with-debian/>

---

## 🚀 Pop!_OS

**Differences between Pop!_OS and Ubuntu — System76**  
Documentação oficial da System76:  
<https://support.system76.com/articles/difference-between-pop-ubuntu/>

**Celebrating 5 Years of Pop!_OS — System76**  
Histórico oficial do projeto:  
<https://system76.com/blog/post/celebrating-5-years-of-pop_os/>

---

## 🤖 Android

**Android Open Source Project — Kernel Overview**  
Documentação oficial sobre o kernel do Android:  
<https://source.android.com/docs/core/architecture/kernel>

**Android — System and Kernel Security**  
Documentação oficial sobre a utilização da segurança do kernel Linux:  
<https://source.android.com/docs/security/overview/kernel-security>

---

## 🎮 SteamOS

**SteamOS — Valve**  
Página oficial com informações sobre a base Arch Linux e integração com Proton:  
<https://store.steampowered.com/steamos/>

---

# 📌 Checklist da atividade

- [x] Pesquisa de 5 Sistemas Operacionais
- [x] Identificação do sistema que serviu como base
- [x] Explicação da relação entre sistema base e derivado
- [x] Comparação das diferenças
- [x] Tabela comparativa
- [x] Explicação sobre kernel e arquitetura
- [x] Referências de pesquisa
- [x] Organização em Markdown

---

<div align="center">

## 🧬 Sistemas Operacionais Derivados

**Debian • Ubuntu • Kali • Pop!_OS • Android • Linux • Arch • SteamOS**

</div>
