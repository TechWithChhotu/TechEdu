# 📘 TechEdu – Modern E-Learning Platform (MERN Stack)

**TechEdu** is a full-stack **E-Learning web application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Vite** and **Tailwind CSS**.

The platform is focused entirely on **technology-based courses** such as programming, web development, and software skills, inspired by platforms like **PW Skills**.

---

## 🚀 Key Features

- Modern & responsive UI using **Tailwind CSS**
- Fast frontend setup with **Vite + React**
- User authentication using **JWT & Cookies**
- Course listing & enrollment system
- Admin panel for managing courses
- Scalable, industry-level folder structure
- Clean and reusable React components

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### State Management

- Redux Toolkit

### Authentication

- JWT (JSON Web Token)
- Cookies

---

## 🎯 Project Goal

To build a **real-world, production-ready e-learning platform** that helps learners upgrade their **technology skills** and helps developers understand **full-stack MERN architecture** through practical implementation.

---

## 🚧 Project Status

🚀 **In Development** – More features and improvements coming soon.

---

# 🚀 TechEdu Backend

TechEdu is an **E-Learning Platform Backend** built using **Node.js, Express.js, and MongoDB**.  
This backend handles APIs for users, courses, and future features like authentication, admin panel, and payments.

---

## 📌 Features

- RESTful APIs using Express.js
- Clean folder structure (MVC pattern)
- Environment variable management with dotenv
- Auto-restart using Nodemon
- User routes & controllers
- Backend ready for course management
- Easy API testing with Postman / Thunder Client
- 📱 OTP-based Login & Registration (Phone Number)
- 🔐 Secure Authentication using JWT
- 🍪 JWT stored in HTTP Cookies (`TechEdu`)
- ⚡ Redis-based OTP storage with expiration
- 🧪 Input validation using express-validator
- 📦 Modular MVC architecture
- 🔄 Auto-restart using Nodemon
- 🧠 Scalable backend design

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **cors**
- **nodemon**

# 🔐 Gitleaks Complete Guide (Beginner → Advanced)

This document explains **what Gitleaks is**, **why GitHub blocks pushes**, **how to detect secrets**, and **how to fix & prevent issues**, based on real-world usage.

---

## 📌 What is Gitleaks?

**Gitleaks** is a security tool that scans your codebase for **secrets**, such as:

- API Keys
- Tokens (JWT, Twilio, Stripe, etc.)
- Passwords
- Private Keys
- OAuth secrets

It helps prevent **accidental secret leaks** to GitHub.

---

## 🔥 Why GitHub Blocks Pushes (Push Protection)

GitHub has **Push Protection** enabled by default.

If **any commit (past or present)** contains a secret:

- GitHub **blocks the push**
- Even if the file is deleted later
- Even if `.gitignore` is used

> ⚠️ `.gitignore` does **NOT** remove secrets from commit history.

---

## 🧠 Difference Between Gitleaks & GitHub Scan

| Tool                   | What it scans         |
| ---------------------- | --------------------- |
| `gitleaks detect`      | Local git history     |
| `gitleaks --no-git`    | Current files only    |
| GitHub Push Protection | Entire commit history |

---

## ⚙️ Installation (Windows)

### Using Winget

````bash
### install gitleaks
winget install gitleaks

### Verify installation:
gitleaks version

### Scan Git History (Committed Code)
gitleaks detect

### Scan Current Files (Even Uncommitted)
gitleaks detect --no-git --source .

### Find Exact File & Line (IMPORTANT)
gitleaks detect --no-git --source . --verbose

### JSON Report (Best for Analysis)

```🧠 Key Takeaways

.gitignore ≠ security

Deleting file ≠ removing history

Gitleaks scans locally

GitHub protects remotely

Environment variables are mandatory

📌 Conclusion

Using Gitleaks properly ensures:

Secure codebase

No GitHub push blocks

Industry-level best practices

Production-ready workflow

📞 Need Help?

If required, you can further add:

GitHub unblock secret steps

Full pre-commit automation

Production .env strategy
---

---

## 📌 Author

**Chhotu Patel**

> **TechEdu – Learn. Build. Grow. 🚀**

````

```

```
