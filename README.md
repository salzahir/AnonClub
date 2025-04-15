# EchoRoom

![EchoRoom Icon](images/icon.png)

Secure anonymous messaging platform with role-based access control built with Node.js, Express, Passport.js, and PostgreSQL.

---

## 🔐 Features

### Authentication & Security
- Secure login/registration with Passport.js
- Three-tier role system (admin/member/user)
- Password hashing with bcrypt
- Session management with Express-session
- CSRF protection to prevent cross-site request forgery attacks

### Messaging
- Anonymous posting
- Role-based message visibility
- Admin message deletion

### UI/UX
- Progressive disclosure UI
- Responsive design
- One-click logout

---

## 🧱 Tech Stack

**Backend**  
Node.js | Express | Passport.js  

**Frontend**  
HTML | CSS | EJS  

**Database**  
PostgreSQL (normalized schema)  

**Security**  
bcrypt | express-validator  

---

## 🚀 Quick Start

1. 
  git clone https://github.com/salzahir/EchoRoom.git

2. 
  cd EchoRoom
  npm install

3.	Set up environment variables:
	•	Create a .env file in the root directory and add the following details:

DATABASE_URL=postgresql://user:pass@localhost:5432/echoroom
SESSION_SECRET=your_random_generated_secret

You can generate a random secret for SESSION_SECRET using the following Node.js command:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Initialize and run
npm run seed  # Populates test users
npm start    # Starts server with live-reload

