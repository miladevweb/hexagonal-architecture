# Hexagonal Architecture

## Domain Layer:

In the domain layer, we only find the business logic.

- Entity

- Errors: Errors about the business logic.

- Value Objects: They perform validations about the business logic, such as discounts, IGV, and so on.

- Repositories: They're constructor classes that serve as intermediaries between the domain, application and infrastructure layers.

## Application Layer:

We found use cases here.

- Use Cases / Services: Create, read, update and delete.

- DTOs: They're interfaces that act as intermediaries between the Domain Layer (Business Logic) and the Infrastructure Layer (Repositories _GET, CREATE and EDIT_ and usually in _GET_ methods for the Controllers).

- Mappers: It converts data from the Domain Layer type to the Infrastructure Layer type.

## Infrastructure Layer:

We found controllers and repositories of our databases to inject them in the services. We may use third party libraries.

- Validation / Schemas: We can validate the Data Type, not the business logic like the object values, with libraries such as ZOD, Express Validator, etc.

- Repositories: They are database constructor classes to be injected in our services. We must do the CRUD operations in the databases. We'll generally use the mappers.

- Controllers: It uses the services and returns the data to the client (Frontend), We'll most likely use the mappers in the GET methods.

### Shared Module:

We often found a Service Container to share our services or use cases within an Object so the dependencies can be easily injected.

This module can also have the Domain, Application and Infrastructure Layer.
