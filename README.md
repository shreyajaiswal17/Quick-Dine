#  Quick-Dine — AI-Enhanced Food Ordering Platform

Quick-Dine is a full-stack **AI-Enhanced Food Ordering Platform** built using the **MERN Stack**. It combines AI-powered food discovery, personalized recommendations, secure authentication, online payments, and a role-based admin dashboard to deliver a modern food ordering experience.


#  Live Demo
###  Customer Portal -
 https://quick-dine-frontend-six.vercel.app

###  Admin Portal
 https://quick-dine-admin.vercel.app

---

# Admin Demo

Use the following credentials to explore the Admin Dashboard.

**Admin URL**
https://quick-dine-admin.vercel.app

**Email**
```text
admindemo@gmail.com
```
**Password**

```text
admindemo@123
```

---

##  Key Highlights

-  AI-powered Natural Language Food Search 
-  Personalized Recommendation Engine based on user order history
-  Role-Based Access Control (RBAC) for Admin Dashboard
-  Secure JWT Authentication using HTTP-only Cookies
-  Stripe Payment Integration
-  Real-time Order Tracking
-  Fully Responsive MERN Application

---

## Features

####  Customer Features

- Browse food categories and menu items
- AI-powered natural language food search
- Personalized **Recommended For You** section
- Smart shopping cart with quantity management
- Secure user authentication
- Stripe payment integration
- Order history
- Live order tracking
- Responsive UI across all devices

---

#### Admin Features

- Secure Admin Login
- Role-Based Admin Authentication (RBAC)
- Add new food items
- Remove food items
- Upload food images
- View all customer orders
- Update order status
- Protected Admin APIs

---

## AI & Personalization

### AI Food Search

Users can search food naturally using prompts like:

- *"Something healthy"*
- *"Spicy food under ₹300"*
- *"High protein meal"*

The application uses **Google Gemini API** to understand user intent and return relevant food items.

---

## Personalized Recommendation Engine

Quick-Dine includes a **hybrid rule-based recommendation engine** that personalizes food suggestions without using Machine Learning.

Recommendations are generated using:

- Previous order history
- Favourite food categories
- Frequently ordered items
- Food-name keyword matching
- Recent ordering behaviour
- Global trending foods (for new users)

New users automatically receive globally popular food recommendations.

---


#  Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS
- React Toastify

---

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

### Authentication & Security

- JWT
- HTTP-only Cookies
- bcrypt
- RBAC

---

### AI & Payments

- Google Gemini API
- Stripe

---



## Installation

### Clone Repository

```bash
git clone https://github.com/shreyajaiswal17/Quick-Dine.git

cd Quick-Dine
```

---

## Backend

```bash
cd backend
npm install
npm run server
```
---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Admin

```bash
cd admin
npm install
npm run dev
```

---

#  Environment Variables

## Backend

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NODE_ENV=
FRONTEND_URL=
```

---

## Frontend
```env
VITE_BACKEND_URL=
```

---

## Admin

```env
VITE_BACKEND_URL=
```

---


#👨‍💻 Author

**Shreya Jaiswal**

GitHub: https://github.com/shreyajaiswal17

LinkedIn: https://www.linkedin.com/in/shreyajaiswal17/

---

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!