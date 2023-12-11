# Polling System Setup Guide

This guide will help you set up the "polling-system" project on your local system. The project is API-based, and it uses NodeJS as the platform, Express.js as the framework, and MongoDB as the database.

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/NileshSatpute19/polling-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd polling-system
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and set the following environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/polling-system
   ```

   Adjust the values as needed, and make sure your MongoDB server is running.

5. Start the application:

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:4001`.

## API Endpoints

The following are the available API endpoints:

- `POST /api/questions`: Create a new question.
- `POST /api/questions/:questionId/options`: Add options to a question.
- `POST /api/questions/:questionId/options/:optionId/vote`: Add a vote to an option of a question.
- `DELETE /api/questions/:questionId`: Delete a question.
- `DELETE /api/questions/:questionId/options/:optionId`: Delete an option.
- `GET /api/questions/:questionId`: View a question with its options and all the votes given to it.

## Project Features

- **Create a Question:**

  - Endpoint: `POST /api/questions`

- **Add Options to a Question:**

  - Endpoint: `POST /api/questions/:questionId/options`

- **Add a Vote to an Option of a Question:**

  - Endpoint: `GET /api/questions/:questionId/options/:optionId/vote`

- **Delete a Question:**

  - Endpoint: `GET /api/questions/:questionId`

- **Delete an Option:**

  - Endpoint: `GET /api/questions/:questionId/options/:optionId`

- **View a Question with Options and Votes:**
  - Endpoint: `GET /api/questions/:questionId`

Note: Some delete operations have optional constraints mentioned in the project description.

Feel free to explore and interact with these endpoints using a tool like [Postman](https://www.postman.com/) or your preferred API testing tool.

Now you have successfully set up the "polling-system" project on your local system. If you encounter any issues, please refer to the project documentation or the repository's issue tracker for assistance.
