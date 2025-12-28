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

### install gitleaks

```bash
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
```

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


## 👤 Edit Profile & Avatar Upload (Face-Focused Cropping)

TechEdu provides a modern **Edit Profile** feature that allows users to update their profile information seamlessly without logging out. This section covers the **Edit Profile UI**, **avatar upload**, and **Cloudinary face-focused image cropping** implementation.

---

### ✨ Features

- Update user **name**
- **Email is read-only** (cannot be edited)
- Upload profile picture via:
  - Click to select file
  - Drag & drop
- Automatic **square avatar (250 × 250)**
- **Face-centered cropping** using Cloudinary AI
- Optimized image delivery (auto quality & format)
- Redux state updates instantly (no page refresh)
- API call triggered **only when changes are detected**

---

### 🧠 How Avatar Cropping Works

Cloudinary stores the **original image**, while transformations are applied at the **delivery (URL) level**.

Instead of saving the original `secure_url`, a **transformed URL** is generated and stored in the database.

#### Transformation Settings

- `crop: fill`
- `gravity: face`
- `width: 250`
- `height: 250`
- `quality: auto`
- `fetch_format: auto`

This ensures:
- Face remains centered
- Avatar is always square
- Consistent UI across the platform

---

### 🛠 Backend Implementation

#### Multer (File Upload Middleware)

- Accepts only image files (`jpg`, `jpeg`, `png`)
- File size limit: **5MB**
- Stores file temporarily before uploading to Cloudinary

#### Cloudinary Upload Logic


const result = await cloudinary.uploader.upload(req.file.path, {
  folder: "TechEdu",
});

const avatarUrl = cloudinary.url(result.public_id, {
  width: 250,
  height: 250,
  crop: "fill",
  gravity: "face",
  quality: "auto",
  fetch_format: "auto",
});

user.avatar = avatarUrl;
```

## And there respection frontend

# Implementation of Razorpay Payment system

# How user enroll in the course

# assign course to the user

## .... and so on

## ✏️ Edit Profile Modal (Frontend)

This component provides a modern **Edit Profile modal** allowing users to update their name and profile picture with a smooth UX and optimized API usage.

---

### 🧩 Component: `EditProfile.jsx`

**Key responsibilities:**

- Load user data from Redux
- Allow editing **name**
- Allow updating **avatar (profile picture)**
- Prevent unnecessary API calls
- Sync updated data back to Redux

---

### 🔄 State Management

- User data is fetched from **Redux Toolkit**
- Local state is used for form editing to avoid mutating global state

```js
const reduxUserData = useSelector((state) => state.userSlice?.userData);

## 📌 Author

**Chhotu Patel**

> **TechEdu – Learn. Build. Grow. 🚀**

```

```

```
