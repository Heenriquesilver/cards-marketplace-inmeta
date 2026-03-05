# 🃏 Cards Marketplace

Marketplace de troca de cartas desenvolvido com **React + TypeScript**.
A aplicação permite que usuários criem contas, adicionem cartas à sua coleção e realizem **propostas de troca com outros usuários**.

Este projeto foi desenvolvido como **desafio técnico para vaga de Front-End Pleno**.

---

# 🚀 Demonstração

Deploy da aplicação:

🔗 https://cards-marketplace-inmeta-qv9l.vercel.app/


# 🧠 Descrição do Projeto

O sistema funciona como um **marketplace de troca de cartas**, onde:

* Usuários possuem uma coleção de cartas
* Podem visualizar cartas disponíveis
* Criam propostas oferecendo suas cartas
* Selecionam cartas que desejam receber

A interface foi construída focando em:

* Experiência do usuário
* Organização de código
* Escalabilidade
* Separação de responsabilidades

---

# ⚙️ Tecnologias Utilizadas

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **React Router DOM**
* **Material UI**

### Gerenciamento de Estado

* **Zustand**

### Comunicação com API

* **Axios**

### Outras ferramentas

* **ESLint**
* **Prettier**

---

# 🧩 Principais Funcionalidades

## 🔐 Autenticação

* Registro de usuário
* Login
* Persistência de sessão
* Controle de rotas autenticadas

---

## 🃏 Gerenciamento de Cartas

O usuário pode:

* Visualizar todas as cartas
* Adicionar cartas à sua coleção
* Visualizar cartas que possui

---

## 🔄 Sistema de Trocas

O usuário pode:

* Criar propostas de troca
* Selecionar cartas para oferecer
* Selecionar cartas que deseja receber

---

## 🛒 Marketplace

Área onde o usuário pode:

* Visualizar trocas disponíveis
* Explorar oportunidades de troca

---

# 🧠 Decisões Técnicas

Algumas decisões foram tomadas pensando em **manutenção e escalabilidade** do projeto:

### 📦 Separação de camadas

* **pages** → páginas da aplicação
* **components** → componentes reutilizáveis
* **services** → comunicação com API
* **store** → gerenciamento de estado global
* **types** → tipagens TypeScript

---

### 🧩 Zustand para estado global

Foi utilizado **Zustand** para manter:

* Usuário autenticado
* Dados globais da aplicação

Motivos:

* Mais simples que Redux
* Menos boilerplate
* Boa performance

---

### ⚡ Vite

Utilizado para:

* Build extremamente rápido
* Hot reload eficiente
* Melhor experiência de desenvolvimento

---

# 📦 Instalação do Projeto

Clone o repositório:

```bash
git clone https://github.com/Heenriquesilver/cards-marketplace-inmeta.git
```

Entre na pasta do projeto:

```bash
cd cards-marketplace-inmeta
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o Projeto

Para rodar o projeto em desenvolvimento:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

# 🏗️ Build para Produção

Para gerar a build do projeto:

```bash
npm run build
```

Para testar a build local:

```bash
npm run preview
```

# 🚀 Melhorias Futuras

Possíveis evoluções do projeto:

* 🔎 Busca de cartas
* 📄 Paginação no marketplace
* 📱 Melhor responsividade mobile
* 🔔 Sistema de notificações de troca
* ⭐ Favoritar cartas
* 💬 Chat entre usuários para negociação

---

# 👨‍💻 Autor

**Luiz Henrique**

GitHub
https://github.com/Heenriquesilver

LinkedIn
https://www.linkedin.com/in/luiz-henrique-59a09613b/

---



Este projeto foi desenvolvido para **avaliação técnica** 
