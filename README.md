# Gestão de Eventos

Sistema completo de gestão de eventos desenvolvido com Spring Boot (backend) e Angular 17 (frontend), seguindo arquitetura hexagonal e Domain-Driven Design (DDD).

## 📋 Visão Geral

Este projeto é uma aplicação full-stack para gerenciar eventos, permitindo criar, listar, visualizar, atualizar e deletar eventos. O backend foi construído com Java/Spring Boot usando arquitetura hexagonal, enquanto o frontend utiliza Angular 17 com Angular Material para uma interface moderna e responsiva.

### Tecnologias Utilizadas

**Backend:**
- Java 17
- Spring Boot 3.x
- PostgreSQL 15
- JPA/Hibernate
- Flyway (migrações)
- Lombok
- Swagger/OpenAPI

**Frontend:**
- Angular 17
- Angular Material
- TypeScript
- RxJS
- Nginx (produção)

**Infraestrutura:**
- Docker & Docker Compose
- Maven (backend)
- npm (frontend)

## 🚀 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Docker** (versão 20.10 ou superior)
- **Docker Compose** (versão 2.0 ou superior)

Para desenvolvimento local (opcional):

- **Java 17** (JDK)
- **Maven 3.8+**
- **Node.js 18+** e **npm**
- **PostgreSQL 15** (se não usar Docker)

## 🏃 Como Rodar

### Iniciar com Docker Compose

A forma mais simples de rodar o projeto é usando Docker Compose. Ele vai subir todos os serviços necessários (banco de dados, backend e frontend) automaticamente.

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd java-spring-angular-gestao-eventos

# Inicie todos os serviços
docker-compose up -d

# Para ver os logs
docker-compose logs -f

# Para parar os serviços
docker-compose down
```

Após iniciar, os serviços estarão disponíveis em:

- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **PostgreSQL:** localhost:5432

### Variáveis de Ambiente

Você pode personalizar as configurações criando um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DB_NAME=gestao_eventos
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432

# Backend
BACKEND_PORT=8080
SPRING_PROFILE=prod
JPA_DDL_AUTO=validate

# Frontend
FRONTEND_PORT=80
```

## 📡 Endpoints da API

A API REST está disponível em `http://localhost:8080/api/events`:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/events` | Lista eventos com paginação (`?page=0&size=10`) |
| `GET` | `/api/events/{id}` | Busca um evento por ID |
| `POST` | `/api/events` | Cria um novo evento |
| `PUT` | `/api/events/{id}` | Atualiza um evento existente |
| `DELETE` | `/api/events/{id}` | Deleta um evento (soft delete) |

### Exemplo de Request (POST)

```json
{
  "title": "Conferência de Tecnologia",
  "description": "Evento sobre as últimas tendências em tecnologia",
  "eventAt": "2024-12-25T10:00:00",
  "location": "Centro de Convenções"
}
```

### Swagger UI

A documentação completa da API está disponível no Swagger UI:

**URL:** http://localhost:8080/swagger-ui.html

Lá você pode testar todos os endpoints diretamente pelo navegador, ver os modelos de dados e exemplos de requisições/respostas.

## 🧪 Como Rodar os Testes

### Testes do Backend

Os testes do backend são executados com Maven:

```bash
# Entrar no container do backend
docker-compose exec backend bash

# Ou executar localmente (se tiver Java/Maven instalado)
cd backend
mvn test
```

Os testes incluem:
- **Testes unitários:** Serviços e repositórios (Mockito)
- **Testes de integração:** Controller REST completo com H2 em memória

### Testes do Frontend

Para rodar os testes do frontend:

```bash
# Entrar no container do frontend (se necessário)
docker-compose exec frontend sh

# Ou executar localmente
cd frontend
npm test
```

## 📚 Estrutura do Projeto

```
java-spring-angular-gestao-eventos/
├── backend/                 # Aplicação Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/gestao/eventos/
│   │   │   │   ├── domain/          # Camada de domínio (DDD)
│   │   │   │   ├── application/     # Casos de uso e serviços
│   │   │   │   └── adapters/        # Adaptadores (REST, JPA)
│   │   │   └── resources/
│   │   │       ├── db/migration/    # Scripts Flyway
│   │   │       └── application.yml
│   │   └── test/                    # Testes
│   └── Dockerfile
├── frontend/                # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Módulo core (singletons)
│   │   │   ├── shared/      # Módulo shared (componentes reutilizáveis)
│   │   │   └── events/      # Feature module (eventos)
│   │   └── styles.css
│   ├── nginx.conf           # Configuração Nginx para SPA
│   └── Dockerfile
├── docker-compose.yml       # Orquestração dos serviços
└── README.md
```

## 🔄 Histórico de Desenvolvimento

Este projeto foi desenvolvido de forma incremental, seguindo boas práticas de desenvolvimento. Aqui está um resumo das principais features e correções:

### Features Principais

**`feat/migration-inicial`**
- Criação da tabela `events` no PostgreSQL com Flyway
- Estrutura inicial do banco de dados

**`feat/criação-dos-endpoints`**
- Implementação do `EventController` REST
- Criação dos DTOs (`EventRequest`, `EventResponse`)
- Handler global de exceções para tratamento de erros

**`feat/criação-da-application`**
- Definição dos casos de uso (use cases)
- Implementação dos serviços de aplicação (Create, Get, List, Update, Delete)

**`feat/criação-da-persistencia`**
- Implementação da camada de persistência com JPA
- `EventEntity` mapeada para a tabela
- `EventRepositoryImpl` convertendo entre domínio e entidade JPA
- Implementação de soft delete (não deleta fisicamente, apenas marca como deletado)

**`feat/criação-do-serviço`**
- Implementação completa dos serviços de aplicação
- Integração entre camadas (controller → service → repository)

**`feat/criacao-dominio`**
- Modelo de domínio `Event` seguindo DDD
- Validações de negócio no domínio
- Métodos para criação, atualização e soft delete

**`feat/estrutura-minima-funcional`**
- Configuração inicial do projeto Spring Boot
- Estrutura básica funcionando end-to-end

**`feat/frontend: Estrutura do Angular 17`**
- Setup do Angular 17 com Material Design
- Criação dos módulos Core, Shared e Events
- Configuração de rotas e lazy loading

**`feat/frontend: Validação e paginação`**
- Implementação de formulários reativos com validação
- Paginação de eventos usando Material Paginator
- Validação de data (não permite datas no passado)
- Configuração do Nginx para servir a API e fazer proxy

**`feat/frontend: Feedback visual`**
- Spinners de carregamento
- Mensagens de erro e sucesso (snackbars)
- Overlay de loading nos formulários
- Melhorias na experiência do usuário

**`docs/criacao-do-swagger`**
- Configuração do OpenAPI/Swagger
- Documentação automática da API
- Interface interativa para testar endpoints

**`test/criação-de-testes`**
- Testes unitários para serviços (Mockito)
- Teste de integração para o controller REST
- Configuração do Maven para executar testes

### Correções (Bugfixes)

**`bugfix/corrigir-dependencias-do-Lombok`**
- Adicionada dependência do Lombok no `pom.xml`
- Resolvido erro de compilação relacionado a anotações do Lombok

**`bugfix/corrigir-tipo-da-coluna-id-de-Events`**
- Corrigido tipo da coluna `id` de `SERIAL` (INTEGER) para `BIGSERIAL` (BIGINT)
- Criada migration V2 para alterar o tipo sem perder dados

**`bugfix/corriigir-soft-delete`**
- Ajuste na conversão de booleano no status `deleted`
- Garantia de que soft delete funciona corretamente

**`feat/build-para-producao-no-frontend`**
- Ajuste no Dockerfile para build de produção
- Uso de `npm ci` e `npx ng build`
- Configuração correta do Nginx para SPA

## 🏗️ Arquitetura

O projeto segue **Arquitetura Hexagonal (Ports & Adapters)** e **Domain-Driven Design (DDD)**:

- **Domain:** Regras de negócio puras, sem dependências externas
- **Application:** Casos de uso e serviços de aplicação
- **Adapters Inbound:** Controllers REST (entrada)
- **Adapters Outbound:** Repositórios JPA (saída)

Isso garante que o código de negócio seja independente de frameworks e facilita testes e manutenção.

---

