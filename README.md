# Clothing e-Commerce App
This project is a full-stack e-commerce web application for a fictional clothing brand, 
built with the MERN stack. It allows users (guests or registered) to browse products, 
filter/search, add items to a cart, checkout, and receive order confirmation emails. 
On the backend, it uses secure user authentication (JWT) and persists data in MongoDB via Mongoose.

# Features
- User registration and login (with secure password hashing)
- JWT-based authentication and session management (via cookies)
- Product browsing: listing, viewing product details.
- Product search and filtering (by size, category, price, etc.)
- Shopping cart that works for guests and logged-in users, with merging logic when a guest logs in.
- Mock checkout flow (no real payment gateway required).
- Order saving: when user checks out, order details (items, total price, date, user info) are persisted in database.
- Order confirmation email sent to user's email after checkout (via Nodemailer)
- Simple, functional frontend UI — minimal styling required, focus on functionality and flow.

## Run the application
  # Start backend server:
    - cd backend
    - npm run dev

  # Start frontend:
    - cd frontend
    - npm start
