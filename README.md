# 🍽️ MessMate - QR-Based Food Ordering System

The backend for a Full Stack MERN application that allows students to scan QR codes placed on mess tables to browse the menu and place food orders directly from their devices.

---

## 🚀 Features

- 📱 Scan QR code to start ordering (table-specific)
- 🧾 Browse real-time menu
- 🛒 Add items to cart and place orders
- 📦 View live order status
- 🧑‍🍳 Admin dashboard to manage orders
- 🔐 Secure login for admin panel

---

## 🏗️ Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React.js, TailwindCSS                      |
| Backend  | Node.js, Express                           |
| Database | MongoDB (Mongoose)                         |
| QR Code  | `qrcode` npm package                       |
| Auth     | JWT + bcrypt                               |
| Hosting  | Vercel (Frontend), Render/Fly.io (Backend) |

---

Sure! Here's a clean and friendly version of the `README.md` section for your `/messmate-backend` folder structure, written to be clear for both contributors and new developers:

---

## 📁 Backend Folder Structure

The backend is built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. Below is the modular structure used for scalability and clean separation of concerns:

```
/messmate-backend
├── controllers/        # Handle HTTP requests (req, res) for each feature
│   ├── authController.js
│   ├── orderController.js
│   ├── menuController.js
│   └── adminController.js

├── services/           # Core business logic (validation, status updates, etc.)
│   ├── authService.js
│   ├── orderService.js
│   └── menuService.js

├── models/             # MongoDB schemas using Mongoose
│   ├── User.js
│   ├── Order.js
│   ├── MenuItem.js
│   └── Table.js

├── repositories/       # Abstract database interactions (optional layer)
│   ├── orderRepository.js
│   └── userRepository.js

├── middlewares/        # Middleware for authentication, error handling, logging
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── logger.js

├── routes/             # API route definitions grouped by feature
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   ├── menuRoutes.js
│   └── adminRoutes.js

├── utils/              # Utility functions like token generation, QR code helpers
│   ├── generateToken.js
│   ├── qrUtils.js
│   └── constants.js

├── config/             # Configuration files (e.g., DB connection, environment setup)
│   ├── db.js
│   └── config.js

├── tests/              # Unit and integration tests
│   ├── auth.test.js
│   ├── order.test.js
│   └── menu.test.js

├── migrations/         # Seeders or database migration scripts
│   └── seedMenu.js

├── index.js            # Application entry point (bootstraps server and DB)
├── Dockerfile          # Docker configuration for containerization
├── .env                # Environment variables (e.g., DB URI, JWT secret)
├── .gitignore          # Files/folders to exclude from git
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

### 📌 Notes:

- Routes follow the pattern: `/api/v1/{resource}` (e.g., `/api/v1/orders`)
- JWT is used for authentication
- `.env` stores sensitive config like `MONGO_URI`, `JWT_SECRET`, and `PORT`
- Docker is supported for deployment
