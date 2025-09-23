# 💸 Paytm Clone – Money Transfer Application  

A **Paytm-like application** that lets users sign up, sign in, update their profile, check balance, and send money to other users.  
Built using **Node.js, Express, MongoDB, Mongoose, JWT, and React**, it demonstrates **authentication, transactions, and secure money transfers**.  

---

## 📋 Steps Followed  

### Step 1 – MongoDB Connection & User Routes  
- Connect to MongoDB instance.  
- Create 3 routes for the user:  
  - **Sign Up** (register new user).  
  - **Sign In** (login with JWT token).  
  - **Update Info** (firstName, lastName, password).  

### Step 2 – Mongoose Schema  
- Import mongoose and connect to MongoDB.  
- Create a user schema with fields (username, firstName, lastName, password).  
- Export the mongoose model.  

### Step 3 – API Routing Setup  
- In `index.js`, route all requests from `/api/v1` to `backend/routes/index.js`.  
- Create `routes/index.js` and export an Express router.  

### Step 4 – User Router  
- Create a new `userRouter`.  
- Route all requests to `/api/v1/user` through this router.  
- Import `userRouter` in `routes/index.js`.  

### Step 5 – Middleware & Config  
- Add **CORS** for cross-origin requests.  
- Add **Body Parser** for JSON input.  
- Add **JWT** for authentication.  

### Step 6 – Signup Route  
- Input validation.  
- Store user in database.  

### Step 7 – Authentication Middleware  
- Middleware to check JWT token.  
- Protect routes so only authenticated users can access them.  

### Step 8 – User Routes  
- **Update Info** route (PUT request).  
- **Bulk Search** route (`/api/v1/user/bulk?filter=<name>`) to search users by name.  

### Step 9 – Bank Schema  
- Create account schema with balance.  
- Store amounts in **integer form** (e.g., `8888` instead of `88.88`).  

### Step 10 – Transactions in Database  
- Ensure multiple operations are **atomic** using Mongoose transactions.  
- Rollback if one operation fails.  
- Prevent race conditions (e.g., 2 simultaneous transfers with insufficient balance).  

### Step 11 – Initialize Balance on Signup  
- Assign each user a **random balance between 1 and 10000**.  

### Step 12 – Account Router  
- Create `accountRouter` for `/api/v1/account`.  
- Handle balance and transfer requests.  

### Step 13 – Balance & Transfer Endpoints  
- **GET /balance** → return user’s current balance.  
- **POST /transfer** → transfer money securely between users with transactions.  

### Step 14 – React Frontend Routing  
- `/signup` → Signup screen.  
- `/signin` → Signin screen.  
- `/dashboard` → Show balance and list of users.  
- `/sendMoney` → Send money to other users.  

---

## 🏗️ Project Structure  

