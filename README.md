#  Quick-Dine - Food Delivery Application

A full-stack food delivery application built with React, Node.js, Express, and MongoDB. Quick-Dine allows customers to browse food items, place orders, make payments, and track their orders in real-time.

## Live Demo

- Customer site: [https://quick-dine-frontend-six.vercel.app](https://quick-dine-frontend-six.vercel.app)
- Admin dashboard: [https://quick-dine-admin.vercel.app](https://quick-dine-admin.vercel.app)

### Admin Demo Credentials

- Email: `admindemo@gmail.com`
- Password: `admindemo@123`

##  Features

### Customer Features
- **Home Page** - Browse food categories and items
- **AI Food Search** - Search food items using natural-language prompts
- **Shopping Cart** - Add/remove items with quantity management
- **User Authentication** - Secure login and registration with httpOnly cookies
- **Payment Integration** - Stripe payment processing with webhook verification
- **Order Tracking** - View order history and track status
- **Order Verification** - Dual-path payment verification (webhook + redirect)

### Admin Features
- **Admin Dashboard** - Manage orders and food items
-  **Add Food Items** - Upload new food items with images
- **Order Management** - View all orders and update status
- **Real-time Updates** - Status changes reflect instantly

##  Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File upload handling
- **Stripe** - Payment processing
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Quick-Dine/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── Pages/           # Page components
│   │   ├── context/         # React context for state management
│   │   ├── assets/          # Images and static files
│   │   └── App.jsx          # Main app component
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
├── admin/                   # React admin panel
│   ├── src/
│   │   ├── components/      # Admin components
│   │   ├── pages/           # Admin pages
│   │   ├── assets/          # Admin assets
│   │   └── App.jsx          # Admin app component
│   └── package.json         # Admin dependencies
├── backend/                 # Node.js backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middlewares
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── uploads/             # Uploaded images
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Stripe account for payments

### 1. Clone the Repository
```bash
git clone https://github.com/shreyajaiswal17/Quick-Dine.git
cd Quick-Dine
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret
MONGODB_URI=mongodb://localhost:27017/quick-dine
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run server
```
The backend will run on `http://localhost:4000`

**For Webhook Testing (Local)**:
```bash
stripe listen --forward-to localhost:4000/api/order/webhook
```
Copy the webhook signing secret and add to `.env` as `STRIPE_WEBHOOK_SECRET`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

### 4. Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```
The admin panel will run on `http://localhost:5174`

## Deployment

### Backend Deployment (Render)

1. **Push to GitHub**: Make sure your code is pushed to GitHub
2. **Create Render Account**: Sign up at [render.com](https://render.com)
3. **Create Web Service**:
   - Connect your GitHub repository
   - Select the `backend` folder
   - Set build command: `npm install`
   - Set start command: `npm start`
4. **Environment Variables**: Add these in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_live_your_webhook_secret
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Deploy Admin Panel**:
   ```bash
   cd admin
   vercel --prod
   ```

4. **Environment Variables**: Add in Vercel dashboard:
   ```
   VITE_BACKEND_URL=https://your-backend-app.onrender.com
   ```

### Post-Deployment Steps

1. **Update CORS**: Replace the placeholder URLs in `server.js` with your actual Vercel URLs
2. **Setup Stripe Webhook**:
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
   - Click **+ Add endpoint**
   - Enter: `https://your-backend.onrender.com/api/order/webhook`
   - Select events: `charge.succeeded`, `charge.failed`, `charge.refunded`
   - Copy **Signing secret** and add to Render `.env` as `STRIPE_WEBHOOK_SECRET`
3. **Test All Features**: Verify authentication (cookies), payments (webhook + redirect), and file uploads work in production
<!-- 
## 🚀 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**: Make sure your code is pushed to GitHub
2. **Create Render Account**: Sign up at [render.com](https://render.com)
3. **Create Web Service**:
   - Connect your GitHub repository
   - Select the `backend` folder
   - Set build command: `npm install`
   - Set start command: `npm start`
4. **Environment Variables**: Add these in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Deploy Admin Panel**:
   ```bash
   cd admin
   vercel --prod
   ```

4. **Environment Variables**: Add in Vercel dashboard:
   ```
   VITE_BACKEND_URL=https://your-backend-app.onrender.com
   ```

### Post-Deployment Steps

1. **Update CORS**: Replace the placeholder URLs in `server.js` with your actual Vercel URLs
2. **Update Environment Files**: Replace placeholder URLs in `.env` files with actual deployment URLs
3. **Test All Features**: Verify authentication, payments, and file uploads work in production -->


##  API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/verify` - Verify auth status (checks cookie)
- `POST /api/user/logout` - User logout (clears cookie)

### Food Routes
- `GET /api/food/list` - Get all food items
- `POST /api/food/ai-search` - Search food items with AI-assisted natural language
- `POST /api/food/add` - Add new food item (Admin)
- `POST /api/food/remove` - Remove food item (Admin)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Get cart items

### Order Routes
- `POST /api/order/place` - Place new order
- `POST /api/order/verify` - Verify payment (frontend redirect)
- `POST /api/order/webhook` - Stripe webhook for payment confirmation
- `POST /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## Payment Integration

Quick-Dine uses Stripe for secure payment processing with dual verification:

### Payment Flow
1. **Setup**: Configure Stripe keys in environment variables
2. **Process**: Orders create Stripe checkout sessions with orderId in metadata
3. **Webhook Verification** (Primary): 
   - Stripe sends `charge.succeeded` event
   - Backend webhook verifies signature and marks order as paid
   - Reliable even if user doesn't complete redirect
4. **Redirect Verification** (Secondary): 
   - User redirected to `/verify` endpoint
   - Checks if webhook already confirmed, or confirms now
   - **Result**: Payment is confirmed by BOTH paths

### Payment Security
- Webhook signature verification using `STRIPE_WEBHOOK_SECRET`
- Raw body parser for webhook (before JSON parsing)
- Race condition prevention with double-check logic
- Order metadata prevents tampering

## Authentication System

Quick-Dine uses secure httpOnly cookies for authentication:

### Authentication Flow
1. **Registration/Login**: User credentials sent to backend
2. **JWT Generation**: Backend creates JWT with user ID
3. **Cookie Storage**: JWT stored in httpOnly cookie (inaccessible to JavaScript)
4. **Auto-Attach**: Browser automatically sends cookie with every request
5. **Middleware Verification**: Auth middleware extracts and verifies JWT
6. **Access Grant**: Verified user ID added to request

### Cookie Features
- **httpOnly**: Protects against XSS attacks
- **Secure**: Only sent over HTTPS in production
- **sameSite: strict**: Prevents CSRF attacks
- **maxAge**: 24-hour expiration

### Auth Endpoints
- `POST /api/user/register` - Create new user account
- `POST /api/user/login` - Login and receive httpOnly cookie
- `POST /api/user/verify` - Check authentication status
- `POST /api/user/logout` - Logout and clear cookie

## Features Showcase

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces

### Real-time Updates
- Order status changes instantly
- Cart updates without page refresh
- Admin dashboard reflects live data

### Security Features
- **httpOnly Cookies** - JWT stored in httpOnly cookies (XSS protection)
- **CSRF Protection** - `sameSite: strict` cookie policy
- **Secure Transport** - HTTPS-only cookies in production
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Auth middleware on all protected endpoints
- **Webhook Verification** - Stripe signature verification
- **Input Validation** - Sanitization on all user inputs

## Environment Variables

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/quick-dine
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:5173
```

**Production (.env on Render)**
```env
NODE_ENV=production
STRIPE_WEBHOOK_SECRET=whsec_live_your_live_secret
```

## Usage

### For Customers:
1. Browse food items on the home page
2. Add items to cart with desired quantities
3. Proceed to checkout and enter delivery address
4. Make payment through Stripe
5. Track order status in "My Orders" section

### For Admins:
1. Access admin panel at `http://localhost:5174`
2. Add new food items with images
3. View and manage all orders
4. Update order status (Food Processing → Out for Delivery → Delivered)

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Shreya Jaiswal**
- GitHub: [@shreyajaiswal17](https://github.com/shreyajaiswal17)



⭐ If you like this project, please give it a star on GitHub!
