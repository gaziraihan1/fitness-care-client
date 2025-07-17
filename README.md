# 🏋️‍♂️ Gym Management Platform | Fitness Care

A **full-stack MERN (MongoDB, Express, React, Node.js)** based Gym Management web application with role-based access (Admin, Trainer, Member).  
It includes trainer booking, slot management, class management, forums, newsletters, and JWT-secured private routes.  
This project was built as part of an assignment/project with modern libraries and best practices.

---

## 🚀 Live Demo

👉 **Live Link:** [https://gym-management-auth-app.web.app/](https://gym-management-auth-app.web.app/)     

---

## ✨ Features

✅ **Role Based Authentication & Authorization**  
- Firebase Authentication with Email/Password & Google Login.  
- JWT issued from backend and stored securely in `localStorage`.  
- Private Routes secured with JWT (`401/403` implemented).  

✅ **Roles & Dashboard**  
- **Admin:** Manage trainers, approve/reject trainer applications, add new classes, view newsletter subscriptions, manage balance.  
- **Trainer:** Apply to be trainer, manage slots, add forums.  
- **Member:** Book trainers, view booked classes, interact in forums, subscribe to newsletter.

✅ **Dynamic Home Page**  
- 🌟 **Featured Classes Section** (with motion animations).  
- 🌟 **Team Section** showing top 3 trainers (from backend).  
- 🌟 **Latest Forum Posts** showing recent posts with links.  
- 🌟 **Newsletter Subscription** form.

✅ **Forums (Community Section)**  
- Post, vote (upvote/downvote), and view details of forum posts.  
- Paginated list with sorting by latest.

✅ **Trainer Details & Booking**  
- View trainers, their expertise, and available slots.  
- Book slots and proceed to Stripe-based payment.

✅ **Stripe Payment Integration**  
- Select membership packages (Basic, Standard, Premium).  
- Save payment info to backend.

✅ **Fully Responsive UI**  
- Built with TailwindCSS & Material Tailwind with gradients and animations (Framer Motion).

---

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ React (with Vite)
- 📦 TanStack Query (React Query)
- 🎨 TailwindCSS + Material Tailwind
- 🌐 React Router
- ✨ Framer Motion (animations)
- 🔥 Firebase Authentication

**Backend:**
- 🌍 Node.js & Express.js
- 🍃 MongoDB (with Mongoose)
- 🔐 JWT Authentication
- 🛡️ Role-based API Protection

**Others:**
- 💳 Stripe for payments
- 📮 Newsletter Management
- ☁️ Deployed on Firebase (Frontend) & Render/Vercel (Backend)

---

## 📌 Installation & Setup

### 🔧 Prerequisites
- Node.js >= 18
- MongoDB running locally or in Atlas
- Firebase project for Authentication

### ⚡ Frontend Setup
# clone repo

```
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-gaziraihan1.git
cd b11a12-client-side-gaziraihan1
```
# install dependencies
```
npm install
```

# start development
```
npm run dev
```

### ⚡ Backend Setup

# Clone
```
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-gaziraihan1.git
cd b11a12-server-side-gaziraihan1
```

# Install dependencies
```
npm install
```

# Create a .env file in the root of this folder with the following keys:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_generated_secret_key
# PORT=5000

# Run in development mode
```
nodemon index.js
```

