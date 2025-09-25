# 🛍️ ecomapp  
*“A backend API for an E-commerce platform built with Node.js, Express, and MongoDB.”*

---
## Features

- **Product Management**:
  - Create, read, update, and delete for category and products
  - Search and filter products by category and product names.
  - Product images are stored on server with multer middleware
  - Admins create, update and delete products
  - Users can only access products

- **User Management**:
  - User registration and authentication (bcrypt for hashing passwords, JWT-based auth).
  - User profile management(read, update, delete)
  - Log in and log out
  - Admins can delete users

- **Cart Management**:
  - Add, update, and remove items from the cart.
  - Checkout functionality.

- **Order Management**:
  - Create and manage orders.
  - Track order status (e.g., pending, shipped, delivered).


    
## Upcoming Features
- Implement payment gateway


## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dboadu2/ecomapp.git
   cd ecomapp

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Create a .env File and Configure Environment Variables**
   ```bash
    MONGODB_URL =
    PORT= 3000
    JWT_SECRET= 
    ADMIN_EMAIL = 
    EMAIL_HOST = smtp.gmail.com
    EMAIL_PORT = 465
    EMAIL_USER = 
    EMAIL_PASS = 
    SUPPORT = 
   ```
4. **To Run**
   #### Start the Server
   ```bash
   npm run dev
   ```     

## Usage
  - Access the API
    - The API will be running at http://localhost:3000 or you can access at https://api-ecommerce-ydb6.onrender.com without cloning whole project.
    - Use tools like Postman or Swagger UI to test the endpoints.

## API Endpoints
### Base URL
`/api`
### User Routes
| Method | Endpoint              | Description            | Access     |
|--------|-----------------------|------------------------|------------|
| POST   | `/user/register`      | Create user account    |   Public   |
| POST   | `/user/makeAdmin/:id` | Add new admin          |   Admin    |
| GET    | `user/:id`            | Get a user             |   Public   |
| GET    | `users/:id`           | Get all users          |   Admin    |
| PUT    | `user/edit/:id`       | Edit user              |   Public   |
| DELETE | `user/delete/:id`     | Delete a user          | User/Admin |


### OTP Routes

| Method | Endpoint         | Description            | Access        |
|--------|------------------|------------------------|---------------|
| POST   | `/verify/:userId`| verify an otp          |   Public      |
| POST   | `/resend/:userId`| resend an otp          |   Public      |

### Password Reset Routes
**Base Route:** `/password`
| Method | Endpoint         | Description               | Access        |
|--------|------------------|---------------------------|---------------|
| POST   | `/resetRequest`  | request for password reset|   Public      |
| POST   | `/reset`         | reset password            |   Public      |


### Auth Routes
**Base Route:** `/user`

| Method | Endpoint       | Description            | Access        |
|--------|----------------|------------------------|---------------|
| POST   | `/login`       | User login             |   Public      |
| GET    | `/logout`      | User logout            |   Public      |


### Product Routes

| Method | Endpoint                      | Description                    | Access        |
|--------|-------------------------------|--------------------------------|---------------|
| POST   | `/category/create`            | create a category              |    Admin      |
| GET    | `/categories`                 | Get all categories             |    Public     |
| GET    | `/products/:categoryId`       | Get product by category        |    Public     |
| PUT    | `/category/edit/:categoryId`  | Edit a category                |    Admin      |
| DELETE | `/category/delete/:categoryId`| Delete a category              |    Admin      |
| POST   | `/product/create/:categoryId` | Create product under a category|    Admin      |
| GET    | `/products`                   | Get all products               |    Public     |
| GET    | `/products/search`            | Get product by query           |    Public     |
| PUT    | `/product/edit/:id`           | Edit product                   |    Admin      |
| DELETE | `/product/delete/:id`         | Delete product                 |    Admin      |

### Cart Routes
**Base Route:** `/cart`

| Method | Endpoint            | Description            |   Access      |
|--------|---------------------|------------------------|---------------|
| GET    | `/view`             | Show cart items        |   Public      |
| POST   | `/create/:productId`| Add items to cart      |   Public      |
| DELETE | `/clear`            | Delete items from cart |   Public      |
| DELETE | `/delete/:productId`| Delete an item         |   Public      |


### Order Routes

| Method | Endpoint           | Description             | Access       |
|--------|--------------------|-------------------------|--------------|
| GET    | `/orders/:id`      | Get user orders         |    User      |
| POST   | `/order`           | Create new order        |    Public    |
| GET    | `/admin/orders`    | Delete order            |    Admin     |
| PUT    | `/admin/orders/:id`| Update order status     |    Admin     |
