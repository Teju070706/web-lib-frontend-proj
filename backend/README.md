# EduVault Backend

Backend API for EduVault - Educational Resource Sharing Platform

## Features

- User authentication (register/login) with JWT
- Role-based access control (user/admin)
- Resource management (CRUD operations)
- Review and rating system
- User bookmarks and download history
- Search and filtering resources

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation

```
bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the root directory (or use the provided one):

```
env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eduvault
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode
```
bash
npm run dev
```

### Production Mode
```
bash
npm start
```

The server will run on http://localhost:3001

## Seeding Data

To populate the database with sample data:

```
bash
npm run seed
# or
node src/seed.js
```

This will create:
- Admin user: admin@example.com / admin123
- Regular user: alex@example.com / user123
- Sample resources and reviews

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Resources
- `GET /api/resources` - Get all resources (with filters)
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create resource (admin only)
- `PUT /api/resources/:id` - Update resource (admin only)
- `DELETE /api/resources/:id` - Delete resource (admin only)
- `POST /api/resources/:id/download` - Increment download count
- `GET /api/resources/featured/popular` - Get popular resources
- `GET /api/resources/featured/top-rated` - Get top rated resources
- `GET /api/resources/meta/subjects` - Get all subjects

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `POST /api/users/bookmarks/:resourceId` - Add bookmark
- `DELETE /api/users/bookmarks/:resourceId` - Remove bookmark
- `GET /api/users/bookmarks` - Get user bookmarks
- `POST /api/users/downloads/:resourceId` - Add to download history
- `GET /api/users/downloads` - Get download history

### Reviews
- `GET /api/reviews/resource/:resourceId` - Get reviews for resource
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/helpful` - Mark review as helpful/unhelpful

## Connecting Frontend

Update your frontend's API base URL to point to the backend:
- Development: `http://localhost:3001/api`
- Production: Your production backend URL
