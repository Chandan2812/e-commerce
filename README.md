# E-commerce API

This is an API for managing e-commerce operations, including user registration, product management, cart handling, and order placement.

## Deployed link

- Backend - https://e-commerce-6vg5.onrender.com

## Installation

```bash
# Clone the repository
git clone <repository_url>

# Navigate to project directory
cd <project_directory>

# Install dependencies
npm install

# Create .env file
PORT=8000
MONGODB_URI=<your_mongodb_uri>
SECRET_KEY=<your_secret_key>

#Start the server
npm run server
```

## Technologies Used

![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logoColor=white&style=for-the-badge)
![bcrypt](https://img.shields.io/badge/-bcrypt-338000?logoColor=white&style=for-the-badge)
![jsonwebtoken](https://img.shields.io/badge/-jsonwebtoken-000000?style=for-the-badge)
![Winston](https://img.shields.io/badge/-Winston-002F6C?style=for-the-badge)
![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?logo=swagger&logoColor=black&style=for-the-badge)



## API Documentation

API documentation is provided using Swagger. You can view the API documentation [here](https://e-commerce-6vg5.onrender.com/api-docs/).

## Endpoints

### User Management

- **Register a new user**: `POST /user/signup`
- **Login as a user**: `POST /user/login`

### Product Management

- **Add a new product**: `POST /product/add`
- **Fetch all products**: `GET /product/all`
- **Fetch products by category**: `GET /product/category/:category`
- **Fetch detailed information about a product**: `GET /product/:id`

### Cart Management

- **Add a product to the cart**: `POST /cart/addToCart`
- **View the cart contents**: `GET /cart`
- **Update product quantity in the cart**: `PATCH /cart/update/:productId`
- **Remove a product from the cart**: `DELETE /cart/remove/:productId`

### Order Management

- **Place an order**: `POST /order/place`
- **View order history**: `GET /order/history`
- **Fetch detailed information about an order**: `GET /order/:orderId`
