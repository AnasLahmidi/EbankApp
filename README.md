# eBank – Banking Backend Application

## 📌 Project Overview

eBank is a backend banking application developed with Spring Boot (Java) that simulates the core functionalities of a real-world banking system. The project focuses on secure authentication, role-based access control, and RESTful API design for managing users, accounts, and banking operations.

## ⚙️ Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Security**
- **JWT (JSON Web Token)**
- **Spring Data JPA / Hibernate**
- **MySQL 8**
- **Maven**
- **Postman** (API testing)

## 🧱 Architecture

The application follows a layered RESTful architecture:

- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic and validation
- **Repository (DAO)**: Manages database access via JPA
- **Security Layer**: JWT-based authentication and authorization

## 🔐 Security Features

- Stateless authentication using JWT
- Role-based authorization (ADMIN, AGENT_GUICHET, CLIENT)
- Secured endpoints with Spring Security
- Password encryption using BCrypt
- Token expiration management (1 hour)

## 👥 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **ADMIN** | System management |
| **AGENT_GUICHET** | Create clients, create bank accounts, manage operations |
| **CLIENT** | View dashboard, make transfers, check balance, view transaction history |

## 🏦 Core Features

### Authentication & User Management
- User authentication with JWT
- Secure login and password change functionality
- Creation and management of clients by agents
- Data initialization for agents

### Banking Operations
- Bank account creation and management
- Account status management (Open, Blocked, Closed)
- Money transfers between accounts
- Balance inquiry
- Transaction history with pagination
- Deposit operations

## 🗄️ Database

- **Database**: MySQL 8
- **ORM**: Hibernate / JPA
- **Schema**: Automatic generation
- **Relations**: Mapping between users, accounts, and transactions

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven
- MySQL 8
- IDE (IntelliJ IDEA recommended)

### Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ebank_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

server.port=8080

jwt.secret=your_secret_key
jwt.expiration=3600000
```

### Running the Application

1. Clone the repository
```bash
git clone https://github.com/your-username/ebank-backend.git
```

2. Navigate to project directory
```bash
cd ebank-backend
```

3. Build and run
```bash
mvn clean install
mvn spring-boot:run
```

The backend runs by default on: **http://localhost:8080**

## 🧪 API Testing

Use Postman to test authentication and secured endpoints:

1. Authenticate via `/api/auth/login` to obtain a JWT token
2. Include the token in headers for protected endpoints:
```
Authorization: Bearer <token>
```

### Main API Endpoints

**Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password

**Agent Operations**
- `POST /api/agent/clients` - Create new client
- `POST /api/agent/accounts` - Create bank account

**Client Operations**
- `GET /api/client/dashboard` - View dashboard
- `POST /api/client/transfer` - Transfer money between accounts

## 📂 Project Structure

```
src/main/java/ma/ebank/backend
│
├── config        # Security & JWT configuration
├── controller    # REST controllers
├── service       # Business logic
├── repository    # Data access layer
├── entity        # JPA entities
├── dto           # Data Transfer Objects
└── util          # Utility classes
```

## 📊 Project Status

✅ Backend completed and fully functional  
⏳ Frontend integration planned but not implemented yet

## 🛠️ Future Improvements

- Complete frontend integration
- Refresh token mechanism
- Enhanced exception handling
- API documentation with Swagger/OpenAPI
- Unit and integration testing
- Docker containerization

## 👨‍💻 Author

**Anas Lahmidi**  
Final-year engineering student – Informatics & Networks  
Java / Spring Boot / DevOps

## 📄 License

This project is developed for educational purposes.
