# 🍽️ MessMate - QR-Based Food Ordering System

A Full Stack MERN application that allows students to scan QR codes placed on mess tables to browse the menu and place food orders directly from their devices.

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

## 📁 Folder Structure

/messmate-backend
├── controllers/ # Handles HTTP requests (req, res) for orders, users, menu, etc.
│ ├── authController.js
│ ├── orderController.js
│ ├── menuController.js
│ └── adminController.js
│
├── services/ # Business logic like calculating totals, updating statuses
│ ├── authService.js
│ ├── orderService.js
│ └── menuService.js
│
├── models/ # Mongoose schemas
│ ├── User.js
│ ├── Order.js
│ ├── MenuItem.js
│ └── Table.js
│
├── repositories/ # Data access layer (optional if services directly use models)
│ ├── orderRepository.js
│ └── userRepository.js
│
├── middlewares/ # Auth, error handling, logging, etc.
│ ├── authMiddleware.js
│ ├── errorHandler.js
│ └── logger.js
│
├── routes/ # Express routes grouped by feature
│ ├── authRoutes.js
│ ├── orderRoutes.js
│ ├── menuRoutes.js
│ └── adminRoutes.js
│
├── utils/ # Helper functions (JWT, QR code, etc.)
│ ├── generateToken.js
│ ├── qrUtils.js
│ └── constants.js
│
├── config/ # Configuration (env, DB connection, etc.)
│ ├── db.js
│ └── config.js
│
├── tests/ # Unit and integration tests
│ ├── auth.test.js
│ ├── order.test.js
│ └── menu.test.js
│
├── migrations/ # (Optional) Seed scripts or DB migration helpers
│ └── seedMenu.js
│
├── index.js # Entry point – initializes app, connects DB, sets up routes
│
├── Dockerfile # Container setup
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md
