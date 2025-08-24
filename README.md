# 🍕 Quick-Dine - Food Delivery Application

A full-stack food delivery application built with React, Node.js, Express, and MongoDB. Quick-Dine allows customers to browse food items, place orders, make payments, and track their orders in real-time.

## 🌟 Features

### Customer Features
- 🏠 **Home Page** - Browse food categories and items
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- 📱 **User Authentication** - Secure login and registration
- 💳 **Payment Integration** - Stripe payment processing
- 📋 **Order Tracking** - View order history and track status
- ✅ **Order Verification** - Payment verification system

### Admin Features
- 📊 **Admin Dashboard** - Manage orders and food items
- ➕ **Add Food Items** - Upload new food items with images
- 📝 **Order Management** - View all orders and update status
- 🔄 **Real-time Updates** - Status changes reflect instantly

## 🛠️ Tech Stack

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

## 📁 Project Structure

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

## 🚀 Installation & Setup

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
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
MONGODB_URI=mongodb://localhost:27017/quick-dine
```

Start the backend server:
```bash
npm run server
```
The backend will run on `http://localhost:4000`

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

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  cartData: Object
}
```

### Food Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}
```

### Order Model
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  date: Date,
  payment: Boolean
}
```

## 🔗 API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login

### Food Routes
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add new food item (Admin)
- `POST /api/food/remove` - Remove food item (Admin)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Get cart items

### Order Routes
- `POST /api/order/place` - Place new order
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## 💳 Payment Integration

Quick-Dine uses Stripe for secure payment processing:

1. **Setup**: Configure Stripe keys in environment variables
2. **Process**: Orders create Stripe checkout sessions
3. **Verification**: Payment status verified via webhooks
4. **Confirmation**: Order status updated after successful payment

## 🎨 Features Showcase

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces

### Real-time Updates
- Order status changes instantly
- Cart updates without page refresh
- Admin dashboard reflects live data

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Input validation and sanitization

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/quick-dine
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
```

## 📱 Usage

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shreya Jaiswal**
- GitHub: [@shreyajaiswal17](https://github.com/shreyajaiswal17)



⭐ If you like this project, please give it a star on GitHub!
