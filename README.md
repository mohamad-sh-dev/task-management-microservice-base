# Task Management Microservices

This project is a microservices-based task management system built with NestJS. It consists of multiple services including Gateway, Users, Tasks, and Token services.


## Services

### Gateway Service
The Gateway service acts as the entry point for the system, handling user requests and routing them to the appropriate microservices.

### Users Service
The Users service manages user-related functionalities such as signup and login.

### Tasks Service
The Tasks service handles task-related operations.

### Token Service
The Token service is responsible for generating and managing user tokens.

## Setup

### Install Dependencies
Run the following command in the root directory and each service directory to install the dependencies:

```bash
npm install
```
### Running the Services
Each service can be started individually. Navigate to the respective service directory and run:

```bash
npm run start
```

### Debugging
To run the services in debug mode, use the provided launch.json configuration in the .vscode directory.

### Testing
Each service includes unit and e2e tests. To run the tests, navigate to the respective service directory and run:

```bash
npm run test
```
### License
This project is licensed under the MIT License.