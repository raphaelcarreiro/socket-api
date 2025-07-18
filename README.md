# 🔌 Socket API

API WebSocket construída com NestJS e Socket.IO, com autenticação modular e estrutura preparada para desenvolvimento com Docker e Dev Containers (VSCode). Ideal para integração com aplicações em tempo real e autenticação baseada em tokens.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **NestJS**
- **Socket.IO**
- **Docker & Docker Compose**
- **ESLint**, **Prettier**, **TypeScript**
- **VSCode Dev Containers** (para facilitar o ambiente de desenvolvimento)

---

## 📂 Estrutura de Diretórios

```plaintext
.
├── .devcontainer/           # Configuração do ambiente remoto de desenvolvimento (VSCode)
├── .docker/                 # Configuração de serviços auxiliares como Logstash
├── src/
│   ├── core/                # Camadas de domínio e infraestrutura
│   │   ├── auth/            # Módulo de autenticação (HTTP + WebSocket)
│   │   └── shared/          # Validações, erros e constantes
│   ├── nestjs/modules/      # Gateways e serviços do NestJS
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Arquivo de bootstrap da aplicação
├── docker-compose.yml       # Orquestração de serviços em containers
├── Dockerfile               # Build da imagem da aplicação
├── README.md                # Documentação do projeto
└── package.json             # Dependências e scripts
```

---

## ⚙️ Requisitos

- Node.js v18+
- Docker e Docker Compose
- (Opcional) VSCode com extensão **Remote - Containers**

---

## 🐳 Executando com Docker

```bash
# Build e sobe os containers
docker compose up --build
```

A aplicação estará disponível em:

- **HTTP/REST (se houver endpoints expostos):** `http://localhost:3002`
- **WebSocket:** `ws://localhost:3000`

---

## 🧪 Executando em Ambiente Dev (VSCode)

Se estiver usando o VSCode:

1. Instale a extensão **Dev Containers**
2. Abra o projeto e clique em `Reopen in Container`
3. O ambiente será iniciado com suporte a Node.js e Docker internos

---

## 🔐 Autenticação via WebSocket

O gateway WebSocket suporta autenticação via tokens JWT. Para conectar-se de forma autenticada:

```js
const socket = io('http://localhost:3000', {
  withCredentials: true,
});
```

---

## 📜 Scripts Disponíveis

```bash
# Iniciar a aplicação em modo dev
npm run start:dev

# Build da aplicação
npm run build

# Rodar lint
npm run lint
```
