# API Key–Based Backend Platform

A production-grade backend implementing API key authentication and usage enforcement, built with Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Email/password auth with JWT (HttpOnly cookies)
- **API Key Management**: Generate, list, and revoke API keys
- **Machine Authorization**: Protect endpoints with API key validation
- **Rate Limiting**: Daily request limits per API key using PostgreSQL
- **MVC Architecture**: Clean separation of concerns

## Tech Stack

- Node.js + Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- MVC pattern

## Project Structure

```
api-key-platform/
│
├── src/
│   │
│   ├── config/                  # App & infra configuration            
│   │   └── postgres.js           # PG pool / client
│   │
│   ├── models/                  # DB access layer (SQL only)
│   │   ├── user.model.js
│   │   ├── apiKey.model.js
│   │   └── apiKeyUsage.model.js
│   │
│   ├── services/                # Business logic (core of backend)
│   │   ├── auth.service.js
│   │   ├── apiKey.service.js
│   │   └── usage.service.js
│   │
│   ├── controllers/             # HTTP layer (req/res only)
│   │   ├── auth.controller.js
│   │   ├── apiKey.controller.js
│   │   └── data.controller.js
│   │
│   ├── middleware/              # Guards & cross-cutting logic
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── apiKey.middleware.js  # API key validation + limits
│   │   └── error.middleware.js
│   │
│   ├── routes/                  # Route declarations only
│   │   ├── auth.routes.js
│   │   ├── apiKey.routes.js
│   │   ├── data.routes.js
│   │   └── index.js
│   │
│   ├── utils/                   # Pure helpers (no side effects)
│   │   ├── jwt.js
|   |   ├── token.js
│   │   ├── password.js
│   │   └── apiKey.js
│   │
│   ├── app.js                   # Express app wiring
│   └── server.js                # App bootstrap
│
├── sql/
│   └── schema.sql               # DB schema (tables, indexes)
│
├── LICENSE
├── .env.example
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/apikey_platform
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
DAILY_LIMIT=1000
```

## Database Setup

```bash
# Create database
createdb apikey_platform

# Run schema
psql apikey_platform < schema.sql
```

## Start Server

```bash
npm start
```

## API Documentation

### Authentication Endpoints (Human Users)

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response sets HttpOnly cookie with JWT.

#### Get Current User
```http
GET /auth/me
Cookie: token=<jwt>
```

#### Logout
```http
POST /auth/logout
Cookie: token=<jwt>
```

### API Key Management (Human Users)

#### Create API Key
```http
POST /keys
Cookie: token=<jwt>
Content-Type: application/json

{
  "name": "Production API Key"
}
```

**Response** (shown once):
```json
{
  "id": "uuid",
  "name": "Production API Key",
  "key": "apk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "created_at": "2026-01-17T..."
}
```

#### List API Keys
```http
GET /keys
Cookie: token=<jwt>
```

#### Revoke API Key
```http
DELETE /keys/:id
Cookie: token=<jwt>
```

### Machine Access (API Key Auth)

#### Protected Data Endpoint
```http
GET /data
x-api-key: apk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Architecture

### Flow Diagrams

**Authentication Flow:**
```
User → Register/Login → bcrypt hash → PostgreSQL
                      ↓
                   JWT Token → HttpOnly Cookie
```

**API Key Lifecycle:**
```
1. Generate: crypto.randomBytes(32) → hash with bcrypt → store hash
2. Return: plain key shown once to user
3. Validate: incoming key → hash → compare with stored hash
4. Revoke: soft delete (is_active = false)
```

**Rate Limiting Logic:**
```
Request → Validate API Key → Check daily usage
                           ↓
                    Within limit? → Increment counter → Process
                    Exceeded? → 429 Too Many Requests
```

### MVC Separation

- **Models**: SQL queries only, no business logic
- **Services**: All business rules, validation, and orchestration
- **Controllers**: HTTP request/response handling only
- **Middleware**: Authentication, authorization, error handling
- **Utils**: Hashing, token generation, key generation

### Database Schema

**users**
- Stores human users with hashed passwords
- One user → many API keys

**api_keys**
- Stores hashed API keys with metadata
- Each key belongs to one user
- Soft delete via `is_active` flag

**api_key_usage**
- Daily usage counters per API key
- Unique constraint on (api_key_id, usage_date)
- Efficient lookups via composite index

## Key Security Features

1. **Password Security**: bcrypt with salt rounds (10)
2. **API Key Security**: 
   - Generated with crypto.randomBytes(32)
   - Hashed before storage (bcrypt)
   - Shown only once at creation
3. **JWT Security**: HttpOnly cookies prevent XSS
4. **Rate Limiting**: PostgreSQL-based, no external dependencies

## Testing with Postman

1. **Register** a user
2. **Login** to get JWT cookie
3. **Create** an API key (save the plain key!)
4. **Test** the `/data` endpoint with `x-api-key` header
5. **Monitor** usage limits by making multiple requests
6. **Revoke** a key and verify it no longer works

## Production Considerations

- [ ] Use environment-specific secrets
- [ ] Enable HTTPS only
- [ ] Add request logging
- [ ] Implement API key rotation reminders
- [ ] Add monitoring for usage patterns
- [ ] Configure CORS for specific origins
- [ ] Add input validation middleware
- [ ] Implement database connection pooling
- [ ] Add health check endpoint
- [ ] Set up database backups

## Extending to SaaS

This backend is ready for:
- Multi-tenant architecture (add `tenant_id`)
- Tiered pricing (different limits per plan)
- Usage analytics (aggregate from `api_key_usage`)
- Webhook notifications (usage alerts)
- Team collaboration (share API keys)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
