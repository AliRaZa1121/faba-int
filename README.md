<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>FABA-INT Microservices Backend</b><br/>
  A scalable, event-driven architecture for order and notification processing using <a href="https://nestjs.com" target="_blank">NestJS</a>, <a href="https://www.rabbitmq.com/" target="_blank">RabbitMQ</a>, and <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master" alt="Coverage" /></a>
</p>

---

## 📁 Project Structure

```
faba-int/
├── api-gateway/            # API Gateway (client entry point)
├── order-service/          # Manages order operations (create, update, delete)
├── notification-service/   # Manages notification and email dispatch
├── docker-compose.yml      # Orchestrates containers for dev setup
└── README.md               # Project documentation
```

---

## 📦 Technology Stack

- **Node.js (NestJS)** - Service architecture
- **RabbitMQ** - Message broker for event-driven communication
- **MongoDB** - Persistent storage for services
- **Docker** - Containerized development environment
- **TypeScript** - Strict typing and structure

---

## ⚙️ Requirements

- **Node.js**: v20.18.1 or v22.14.0
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **WSL (Windows only)**: [Setup Instructions](https://docs.microsoft.com/en-us/windows/wsl/install)

---

## 🔐 Environment Configuration

Use `.env.example` provided in each service folder and copy it for local usage:

```bash
# For development
$ cp api-gateway/.env.example api-gateway/development.env
$ cp order-service/.env.example order-service/development.env
$ cp notification-service/.env.example notification-service/development.env

# For production
$ cp api-gateway/.env.example api-gateway/production.env
$ cp order-service/.env.example order-service/production.env
$ cp notification-service/.env.example notification-service/production.env
```

## 🐳 Docker Usage

Spin up the entire project using Docker:

```bash
docker compose up --build
```

This will launch:

- `api-gateway` on `localhost:3000`
- `order-service` on `localhost:3001`
- `notification-service` on `localhost:3002`
- `RabbitMQ UI` on [localhost:15672](http://localhost:15672) (`guest` / `guest`)
- `MongoDB` on `localhost:27017`

---

## 📬 Message Patterns

All services communicate via RabbitMQ using well-defined patterns:

| Service      | Event Pattern                               |
| ------------ | ------------------------------------------- |
| Order        | `order_service_create_order`                |
|              | `order_service_update_order`                |
|              | `order_service_delete_order`                |
| Notification | `notification_service_trigger_email`        |
|              | `notification_service_trigger_notification` |

---

Use [Swagger](http://localhost:3000/swagger) to test APIs via `api-gateway`.

---

## ✅ Testing

- Each service should have its own `unit` and `e2e` test suites using `Jest`.
- Validate message handling using RabbitMQ’s Management UI.

---

## 👥 Contributors & Support

Based on the [NestJS Starter Project](https://github.com/nestjs/nest)

For questions or enhancements, please create an issue or PR.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
