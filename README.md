# **<ins>Book Shop Store (B4A2V1)</ins>**

An Express.js application built with TypeScript and MongoDB, designed to manage a book store with CRUD functionality for books and orders. The application ensures data integrity using Mongoose schema validation and supports essential bookstore operations such as product management, order placement, and revenue calculation.

## **Features**

### **Product Management**

- **Create a Book:** Add a new book with details like title, author, price, category, description, quantity, and availability.

- **Get All Books:** Retrieve a list of all books, optionally filtered by search terms (title, author, or category).

- **Get a Specific Book:** Fetch detailed information about a specific book using its unique ID.

- **Update a Book:** Update book details like price and stock quantity.

- **Delete a Book:** Remove a book from the store inventory.

### **Order Management**

- **Place an Order:** Customers can order books, with inventory management ensuring stock consistency.

- **Inventory Updates:** Automatically updates stock levels and availability status (inStock) when orders are placed.

- **Error Handling for Stock Issues:** Prevents orders if the requested quantity exceeds stock availability.

### **Revenue Calculation**

- **Total Revenue:** Calculate total revenue generated from all orders using MongoDB's aggregation pipeline.

### **Error Handling**

- Centralized error responses with descriptive messages, success status, and validation feedback for easier debugging and user clarity.

### **API Endpoints**

**Products**

- **POST /api/products:** Add a new book.
- **GET /api/products:** Retrieve all books (with optional search filter by title, author, or category).
- **GET /api/products/:productId:** Fetch details of a specific book by ID.
- **PUT /api/products/:productId:** Update details of a specific book by ID.
- **DELETE /api/products/:productId:** Remove a book by ID.

**Orders**

- **POST /api/orders:** Place a new order.
- **GET /api/orders/revenue:** Get total revenue from all orders.

## **Project Setup**

### **Prerequisites**

- **[Node.js](targetURL 'https://nodejs.org/en')** installed on your machine.
- **[MongoDB](targetURL 'https://www.mongodb.com/')** set up and running.
- A package manager like **npm** or **yarn**.

## **Installation Steps**

- Clone the Repository
- Install Dependencies
- Environment Variables Create a .env file in the root directory
- Run the Application

### **Technologies Used**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Validation:** Mongoose Schema Validation
- **Error Handling:** Centralized error middleware
- **Environment Management:** dotenv

### **Contributing**

Contributions are welcome! Please fork this repository and create a pull request for review.

### **Live Deployment Link**

- [Click Here](targetURL 'batch4-assignment-2.vercel.app')
