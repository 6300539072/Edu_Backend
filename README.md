# Edu_Backend

## Project Overview
Edu_Backend is a simple Node.js and Express.js application designed for managing educational content. The application provides features for user registration, authentication, and CRUD operations on courses and lessons.

## Setup Instructions

### Prerequisites
- Node.js v14 or higher
- MySQL database

### Installation
1. Clone the repository:
   ```bash
   
   this is git clone link:  https://github.com/6300539072/Edu_Backend.git

   then after 
2. Navigate to the project directory:
   
      cd Edu_Backend 
3. Install dependencies:

   npm install
4. Set up environment variables:
  Create a .env file in the root directory if it is there no need to create.

  Add the following variables:

PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=edu_backend //your database name
JWT_SECRET=yourjwtsecret //99d6d25c40b59e51b604d31854a0640814d8b3519fec313fc0be1fe06bbd708e

5. Start the server:

   npm run dev

*****************************************************************************************************


# API Documentation

@ ExampleEndpoint: http://localhost:5000/api/courses
# User Registration
@ Endpoint: POST /api/auth/register
•	Request Body:
{
  "username": "vinod",
  "email": "vinodkumarpvk111@gmail.com",
  "password": "password123"
}
# Response:
o	201: User created successfully.
o	400: Validation errors.
 # Login
•	Endpoint: POST /api/auth/login
•	Request Body:
{
  "email": "vinodkumarpvk111@gmail.com ",
  "password": "password123"
}
# Response:
o	200: Authentication successful, returns JWT token.
o	401: Authentication failed.
CRUD Operations on Courses

In crud operations Jwt token will use in headers
# Create Course: POST /api/courses
Request Body:
{
  "title": "Node.js for Beginners",
  "description": "Learn the basics of Node.js"
}

# Get All Courses: GET /api/courses
# Update Course: PUT /api/courses/:id
Request Body:
{
  "title": "Node.js for Beginners",
  "description": "Learn the basics of Node.js"
}

#  Delete Course: DELETE /api/courses/:id

CRUD Operations on Lessons
# Create Lesson: POST /api/lessons
Request Body:
{
  "title": "Introduction to Node.js",
  "content": "This lesson covers the promises of Node.js...",
  "courseId":1
}

# Get All Lessons: GET /api/lessons
Update Lesson: PUT /api/lessons/:id
Request Body:
{
  "title": "Introduction to Node.js",
  "content": "This lesson covers the promises of Node.js...",
  "courseId":1
}
#	Delete Lesson: DELETE /api/lessons/:id
Search Functionality
•	Endpoint: GET /api/search
•	Query Params: ?q=keyword
•	Response: Returns search results based on the keyword.

Assumptions and Decisions
•	JWT is used for securing API endpoints.
•	Sequelize ORM is used for managing database interactions.
•	Data validation is handled using express-validator.

Here's a simple description of how you can visualize the ER diagram:
Diagram Structure

1. Users Table
•	   - `id` (PK)
•	   - `username`
•	   - `email`
•	   - `password`
•	   - `createdAt`
•	   - `updatedAt`
•	
       2. Courses Table
•	   - `id` (PK)
•	   - `title`
•	   - `description`
•	   - `createdAt`
•	   - `updatedAt`
•	
3. Lessons Table
•	   - `id` (PK)
•	   - `title`
•	   - `content`
•	   - `course_id` (FK)
•	   - `createdAt`
•	   - `updatedAt`
•	
 # Relationships
•	
•	- Users*can have many **Courses**.
•	- **Courses** can have many **Lessons**.
•	
### Visual Representation
•	
•	- **Users** entity has a one-to-many line connection to **Courses**.
•	- **Courses** entity has a one-to-many line connection to **Lessons**.


 


         
