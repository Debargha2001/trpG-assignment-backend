# Employee Management CRUD Application

## Installation Guide

### Using Docker Image

1. Pull the Docker image:

   ```bash
   docker pull debargha2001/employe_management:1.0.0
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 8080:8080 debargha2001/employe_management:1.0.0
   ```

### Using GitHub Repository

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Change directory to the cloned repository:

   ```bash
   cd <directory>
   ```

3. Build and install dependencies:

   ```bash
   npm install
   npm run build
   ```

4. Start the application:

   ```bash
   npm run start
   ```

## API Documentation

### Base URLs

- Local: `http://localhost:8080`
- Production: `http://3.7.71.179:8080`

### Create User

- **Method:** POST
- **Endpoint:** `/v1/employees`
- **Payload:**

  ```json
  {
      "name": "Test User 1",
      "email": "testuser1@gmail.com",
      "position": "Frontend Developer",
      "salary": 500000
  }
  ```

- **Response:**

  ```json
  {
      "error": boolean,
      "message": string,
      "statusCode": number,
      "data": <object containing new user data>
  }
  ```

### Update User

- **Method:** PUT
- **Endpoint:** `/v1/employees/:id`
- **Payload:**

  ```json
  {
      "salary": 700000
  }
  ```

- **Response:**

  ```json
  {
      "error": boolean,
      "message": string,
      "statusCode": number,
      "data": <updated user list>
  }
  ```

### Delete User

- **Method:** DELETE
- **Endpoint:** `/v1/employees/:id`
- **URL Path Parameter:** `id` → employee id
- **Response:**

  ```json
  {
      "error": boolean,
      "message": string,
      "statusCode": number,
      "data": <updated user list>
  }
  ```

### Fetch Users

- **Method:** GET
- **Endpoint:** `/v1/employees/:id`
- **URL Query Parameter:**

  - For Searching:

    - Search by name: `GET {base_url}/employees?name=test`
    - Search by email: `GET {base_url}/employees?email=testEmail`
    - Search by position: `GET {base_url}/employees?position=testPosition`
    - Search by id: `GET {base_url}/employees?id=userId`

  - For Sorting:

    - Query Parameters for sorting:

      - `sort` (string): `name` [ascending order], `-name` [descending order], `salary` [ascending order], `-salary` [descending order]

      Example: `GET {base_url}/employees?sort=name,-salary`

  - Combining searching and sorting:

    Example: `GET {base_url}/employees?position=testPosition&sort=name,-salary`

- **Response:**

  ```json
  {
      "error": boolean,
      "message": string,
      "statusCode": number,
      "data": <user list>
  }
  ```

### Fetch User By ID

- **Method:** GET
- **Endpoint:** `/v1/employees/:id`
- **URL Path Parameter:** `id` → employee id
- **Response:**

  ```json
  {
      "error": boolean,
      "message": string,
      "statusCode": number,
      "data": <Object containing user data>
  }
  ```

