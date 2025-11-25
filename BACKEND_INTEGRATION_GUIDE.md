# CoRE Website - Backend Integration Guide

**Version:** 1.0  
**Date:** November 24, 2025  
**Frontend Stack:** React 18.2.0 + Vite 5.0.0 + React Router DOM 6.18.0

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [API Endpoints Required](#api-endpoints-required)
3. [Data Models](#data-models)
4. [Form Submissions](#form-submissions)
5. [Authentication System](#authentication-system)
6. [File Structure Reference](#file-structure-reference)
7. [Environment Variables](#environment-variables)
8. [Deployment Considerations](#deployment-considerations)
9. [Testing Checklist](#testing-checklist)

---

## 🎯 System Overview

### Purpose
CoRE (Club of Research and Engineering) at VCET Puttur needs a lightweight backend to handle:
- Student application form submissions
- Newsletter email subscriptions
- User authentication (login system)
- Optional: Project/Event management dashboard

### Critical Requirements
- **Low Memory Usage**: Target <50MB RAM (college server limitation)
- **Minimal Dependencies**: Keep bundle size small
- **Static Hosting Compatible**: Should work with services like Netlify, Vercel, or simple VPS
- **Fast Response Times**: <200ms for form submissions

### Recommended Tech Stack Options

**Option 1: Serverless (Recommended for Low Memory)**
- Netlify Functions / Vercel Serverless
- Supabase (PostgreSQL + Auth + Storage)
- SendGrid/Mailgun for emails
- **Pros**: Zero server management, auto-scaling, free tier available
- **Cons**: Cold start latency (~500ms first request)

**Option 2: Lightweight Node.js**
- Express.js + PostgreSQL/SQLite
- PM2 for process management
- Nginx reverse proxy
- **Pros**: Full control, predictable performance
- **Cons**: Server maintenance required

**Option 3: Firebase (Easiest)**
- Firebase Firestore (NoSQL)
- Firebase Auth
- Firebase Cloud Functions
- **Pros**: Easy setup, Google infrastructure
- **Cons**: Vendor lock-in, pricing can scale

---

## 🔌 API Endpoints Required

### 1. Application Form Submission

**Endpoint:** `POST /api/applications`

**Request Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+91 98765 43210",
  "college": "VCET Puttur",
  "year": "2nd",
  "branch": "CSE",
  "usn": "4VP22CS123",
  "interests": "Web Development, AI/ML, IoT",
  "skills": "Python, JavaScript, React, C++, Git, Figma",
  "experience": "Built a weather app, participated in Smart India Hackathon",
  "github": "https://github.com/johndoe",
  "portfolio": "https://johndoe.com",
  "preferredTeam": "Tech Support - Frontend",
  "motivation": "I want to learn from experienced developers...",
  "availability": "5-10"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "app_abc123xyz",
  "timestamp": "2025-11-24T10:30:00Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "phone": "Invalid phone number"
  }
}
```

**Frontend Implementation Location:** `src/pages/Contact.jsx` (line 73-95)

---

### 2. Newsletter Subscription

**Endpoint:** `POST /api/newsletter/subscribe`

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Error Responses:**
- `400`: Invalid email format
- `409`: Email already subscribed
- `500`: Server error

**Frontend Implementation Location:** `src/components/Newsletter.jsx` (line 26-48)

---

### 3. User Authentication (Login)

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "admin@vcetputtur.ac.in",
  "password": "securePassword123"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "admin@vcetputtur.ac.in",
    "role": "admin",
    "name": "Admin User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Frontend Implementation:** Currently just a link to `/login` in `src/components/Header.jsx` (line 52)
- **Note:** Login page not yet implemented in frontend

---

### 4. Contact Form (Simple Inquiries)

**Note:** Currently using same endpoint as application form. Consider separate endpoint if needed:

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "I'd like to discuss a collaboration..."
}
```

---

## 📊 Data Models

### Application Schema

```javascript
{
  id: String (UUID or auto-increment),
  
  // Personal Information
  firstName: String (required, min: 2, max: 50),
  lastName: String (required, min: 2, max: 50),
  email: String (required, unique, validated),
  phone: String (required, min: 10, validated),
  
  // Academic Information
  college: String (required, default: "VCET Puttur"),
  year: Enum ["1st", "2nd", "3rd", "4th"] (required),
  branch: Enum ["CSE", "ISE", "ECE", "EEE", "ME", "CV", "Other"] (required),
  usn: String (optional, min: 5, max: 20),
  
  // Technical Background
  interests: String (required, max: 200),
  skills: String (required, max: 500),
  experience: String (optional, max: 1000),
  github: String (optional, URL validated),
  portfolio: String (optional, URL validated),
  
  // Interest in CoRE
  preferredTeam: Enum [
    "Tech Support - Frontend",
    "Tech Support - Backend",
    "Tech Support - DevOps",
    "Design - UI/UX",
    "Design - Graphics",
    "PoC",
    "Not Sure"
  ] (required),
  motivation: String (required, min: 50, max: 2000),
  availability: Enum ["2-5", "5-10", "10-15", "15+"] (optional),
  
  // Metadata
  status: Enum ["pending", "reviewing", "accepted", "rejected"] (default: "pending"),
  submittedAt: DateTime (auto-generated),
  reviewedAt: DateTime (nullable),
  reviewedBy: String (nullable, references User.id),
  notes: String (optional, admin notes)
}
```

### Newsletter Subscription Schema

```javascript
{
  id: String (UUID),
  email: String (required, unique, validated),
  subscribedAt: DateTime (auto-generated),
  isActive: Boolean (default: true),
  unsubscribedAt: DateTime (nullable)
}
```

### User Schema (for Admin Dashboard)

```javascript
{
  id: String (UUID),
  email: String (required, unique, validated),
  password: String (hashed with bcrypt, min 8 chars),
  role: Enum ["admin", "moderator", "viewer"] (default: "viewer"),
  name: String (required),
  createdAt: DateTime (auto-generated),
  lastLogin: DateTime (nullable)
}
```

---

## 📝 Form Submissions

### Current Frontend Implementation

#### Contact/Application Form (`src/pages/Contact.jsx`)

**Form Handling:**
- Lines 73-95: `handleSubmit()` function
- Lines 48-59: `handleBlur()` for real-time validation
- Lines 28-44: `validateField()` function

**Validation Rules (Frontend):**
```javascript
// Email: Must match regex pattern
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone: Must be at least 10 digits
/^[\d\s\-\+\(\)]{10,}$/

// Name fields: Minimum 2 characters
firstName.length >= 2 && lastName.length >= 2

// USN: Minimum 5 characters (optional field)
usn.length >= 5 || usn.length === 0
```

**Current Form Endpoint Configuration:**
```javascript
// Line 6: src/pages/Contact.jsx
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/{YOUR_FORM_ID}'
```

**Netlify Form Detection (Alternative):**
```html
<form name="contact" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
  <!-- Form fields -->
</form>
```

#### Newsletter Form (`src/components/Newsletter.jsx`)

**Form Handling:**
- Lines 26-48: `handleSubmit()` function
- Line 10: Email validation regex

**Validation Rule:**
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

---

## 🔐 Authentication System

### Current State
- Login link exists in header (`src/components/Header.jsx` line 52)
- No login page implemented yet
- No auth state management

### Backend Requirements

**JWT Token-Based Auth Recommended:**

1. **Login Flow:**
   - User submits email + password
   - Backend validates credentials
   - Returns JWT token + user info
   - Frontend stores token in `localStorage`

2. **Token Storage (Frontend):**
```javascript
// After successful login
localStorage.setItem('authToken', token)
localStorage.setItem('user', JSON.stringify(user))

// For authenticated requests
const token = localStorage.getItem('authToken')
fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

3. **Protected Routes Needed:**
```
GET  /api/admin/applications      - List all applications
GET  /api/admin/applications/:id  - Get single application
PATCH /api/admin/applications/:id - Update status/notes
GET  /api/admin/newsletter        - List subscribers
POST /api/admin/users             - Create admin user
```

4. **Session Management:**
- Token expiry: 7 days recommended
- Refresh token mechanism (optional)
- Logout: Clear localStorage on frontend

---

## 📁 File Structure Reference

### Current Frontend Structure
```
CoRE/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx      - Global error handler
│   │   ├── SEO.jsx                - Meta tags management
│   │   ├── Newsletter.jsx         - Newsletter signup form
│   │   ├── Header.jsx             - Navigation + theme toggle
│   │   ├── Footer.jsx             - Footer with social links
│   │   ├── Icon.jsx               - SVG icon library (16 icons)
│   │   ├── Logo.jsx               - CoRE logo component
│   │   ├── DoodleTeam.jsx         - Animated background
│   │   ├── DoodleNetwork.jsx      - Network animation
│   │   ├── DoodleOverlay.jsx      - Overlay animations
│   │   └── GLCanvas.jsx           - WebGL background
│   ├── pages/
│   │   ├── Home.jsx               - Landing page
│   │   ├── About.jsx              - About CoRE
│   │   ├── Activities.jsx         - Activities overview
│   │   ├── Projects.jsx           - Projects showcase (with search)
│   │   ├── Events.jsx             - Events listing
│   │   ├── Team.jsx               - Team members
│   │   ├── Contact.jsx            - Application form (main form)
│   │   ├── Join.jsx               - Join info page
│   │   └── NotFound.jsx           - 404 page
│   ├── data/
│   │   └── projectsData.js        - Projects & events data
│   ├── App.jsx                    - Router setup
│   ├── main.jsx                   - App entry point
│   └── styles.css                 - Global styles
├── public/
│   └── index.html                 - HTML template (SEO metadata)
├── package.json
├── vite.config.js
└── README.md
```

### Data Files Location

**Projects & Events Data:** `src/data/projectsData.js`
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Description...",
    tags: ["React", "Node.js"],
    status: "Active",
    contributors: 5,
    github: "https://github.com/..."
  }
  // ... 6 projects total
]

export const events = [
  {
    id: 1,
    title: "Event Name",
    description: "Description...",
    date: "2024-01-15",
    category: "Hackathon",
    capacity: 50,
    registered: 35
  }
  // ... 3 events total
]
```

**Note:** If backend manages projects/events, create corresponding API endpoints:
- `GET /api/projects` - List all projects
- `GET /api/events` - List all events

---

## 🌍 Environment Variables

### Frontend (.env)
```env
# API Base URL
VITE_API_BASE_URL=https://api.corevcet.in
# or for development
VITE_API_BASE_URL=http://localhost:3000

# Form Submission (if using Formspree)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Newsletter (if using external service)
VITE_NEWSLETTER_API_KEY=your_mailchimp_api_key

# Optional: Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/core_db
# or for SQLite
DATABASE_URL=file:./core.db

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Email Service (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=core@vcetputtur.ac.in
SMTP_PASS=your_app_password

# Newsletter Service (optional)
MAILCHIMP_API_KEY=your_key
MAILCHIMP_LIST_ID=your_list_id

# CORS
CORS_ORIGIN=https://corevcet.in,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🚀 Deployment Considerations

### Frontend Deployment (Already Configured)
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Dev Server:** `npm run dev` (port 5173)

**Recommended Hosts:**
- Netlify (with Netlify Functions for serverless)
- Vercel (with Vercel Serverless)
- Cloudflare Pages
- GitHub Pages (static only, no backend)

### Backend Deployment Options

#### Option 1: Serverless (Recommended for Low Memory)

**Netlify Functions Example:**
```javascript
// netlify/functions/submit-application.js
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  
  const data = JSON.parse(event.body)
  
  // Validate data
  // Save to database (Supabase, Firebase, etc.)
  // Send confirmation email
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: 'Application submitted'
    })
  }
}
```

#### Option 2: VPS/Cloud Server

**Minimum Server Specs:**
- 512MB RAM (for Node.js)
- 1 CPU core
- 10GB storage
- Ubuntu 22.04 LTS

**Stack:**
```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt-get install nginx
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.corevcet.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ Testing Checklist

### Backend API Testing

**1. Application Form Endpoint:**
- [ ] Valid application submission returns 200
- [ ] Duplicate email returns appropriate error
- [ ] Invalid email format rejected
- [ ] Invalid phone format rejected
- [ ] Required fields validation works
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] Rate limiting works (max 5 submissions per IP per hour)

**2. Newsletter Endpoint:**
- [ ] Valid email subscription returns 200
- [ ] Duplicate subscription returns 409
- [ ] Invalid email format rejected
- [ ] Unsubscribe link works
- [ ] Rate limiting works

**3. Authentication Endpoint:**
- [ ] Valid credentials return token
- [ ] Invalid credentials return 401
- [ ] Token expiry works correctly
- [ ] Brute force protection active
- [ ] Password hashing works (bcrypt)

**4. Performance Tests:**
- [ ] Response time <200ms for form submissions
- [ ] Memory usage <50MB under load
- [ ] Handles 100 concurrent requests
- [ ] Database connection pooling works
- [ ] Error handling doesn't crash server

### Integration Testing

**Frontend + Backend:**
- [ ] Form submission from Contact page works
- [ ] Newsletter signup from Home page works
- [ ] Error messages display correctly
- [ ] Loading states show during submission
- [ ] Success messages display correctly
- [ ] CORS headers configured correctly
- [ ] SSL certificate installed (HTTPS)

---

## 📧 Email Notifications

### Required Email Templates

**1. Application Confirmation (to applicant):**
```
Subject: Application Received - CoRE VCET

Hi [firstName],

Thank you for applying to join CoRE! We've received your application and will review it within 14 days.

Application Details:
- Email: [email]
- Preferred Team: [preferredTeam]
- Submitted: [timestamp]

We'll notify you at this email address once we've reviewed your application.

Best regards,
CoRE Team
VCET Puttur

---
Questions? Reply to this email or contact us at core@vcetputtur.ac.in
```

**2. Application Notification (to admins):**
```
Subject: New Application - [firstName] [lastName]

New application received:

Name: [firstName] [lastName]
Email: [email]
Branch: [branch] - [year] Year
Preferred Team: [preferredTeam]

View full application: https://admin.corevcet.in/applications/[id]
```

**3. Newsletter Welcome (to subscriber):**
```
Subject: Welcome to CoRE Newsletter

Thanks for subscribing! You'll now receive updates about:
- Upcoming workshops and events
- Project showcases
- Tech talks and opportunities

Unsubscribe anytime: [unsubscribe_link]
```

---

## 🔒 Security Best Practices

### Backend Security Checklist

**1. Input Validation:**
```javascript
// Example validation middleware
const validateApplication = (req, res, next) => {
  const { email, phone, firstName, lastName } = req.body
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    })
  }
  
  // Sanitize inputs
  req.body.firstName = sanitize(firstName)
  req.body.lastName = sanitize(lastName)
  
  next()
}
```

**2. Rate Limiting:**
```javascript
// Example with express-rate-limit
const rateLimit = require('express-rate-limit')

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour per IP
  message: 'Too many submissions, please try again later'
})

app.post('/api/applications', formLimiter, submitApplication)
```

**3. SQL Injection Prevention:**
- Use parameterized queries
- Use ORM (Prisma, Sequelize, TypeORM)
- Never concatenate SQL strings

**4. XSS Prevention:**
- Sanitize all user inputs
- Use libraries like DOMPurify
- Set Content-Security-Policy headers

**5. CORS Configuration:**
```javascript
const cors = require('cors')

app.use(cors({
  origin: ['https://corevcet.in', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH'],
  credentials: true
}))
```

**6. Environment Variables:**
- Never commit `.env` files
- Use secrets management (AWS Secrets Manager, Vault)
- Rotate JWT secrets regularly

---

## 📚 Recommended Backend Implementation

### Minimal Express.js Backend (Starter Template)

**File: `server.js`**
```javascript
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use(limiter)

// Routes
app.post('/api/applications', async (req, res) => {
  try {
    // Validate input
    // Save to database
    // Send email notification
    
    res.json({
      success: true,
      message: 'Application submitted successfully'
    })
  } catch (error) {
    console.error('Application error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    
    // Validate email
    // Save to database
    // Send welcome email
    
    res.json({
      success: true,
      message: 'Successfully subscribed'
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

**Dependencies (`package.json`):**
```json
{
  "name": "core-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.7"
  }
}
```

---

## 🎓 Database Schema (SQL)

### PostgreSQL Schema

```sql
-- Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  college VARCHAR(100) NOT NULL DEFAULT 'VCET Puttur',
  year VARCHAR(10) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  usn VARCHAR(20),
  interests TEXT NOT NULL,
  skills TEXT NOT NULL,
  experience TEXT,
  github VARCHAR(255),
  portfolio VARCHAR(255),
  preferred_team VARCHAR(100) NOT NULL,
  motivation TEXT NOT NULL,
  availability VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by INTEGER REFERENCES users(id),
  notes TEXT
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP
);

-- Users (for admin dashboard)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer',
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_users_email ON users(email);
```

---

## 📞 Support & Contact

### For Backend Developer

**Frontend Repository:** [GitHub URL]  
**Live Frontend:** https://corevcet.in  
**Contact Person:** [Your Name]  
**Email:** [Your Email]  

**Important Notes:**
1. All form validation rules are already implemented in frontend
2. Frontend expects JSON responses as documented
3. CORS must allow origin: `https://corevcet.in` and `http://localhost:5173`
4. Response times should be <200ms for good UX
5. Memory usage must stay <50MB (server limitation)

**Questions to Clarify:**
- [ ] Which database do you prefer? (PostgreSQL/MySQL/SQLite/MongoDB)
- [ ] Email service preference? (SendGrid/Mailgun/AWS SES)
- [ ] Admin dashboard needed? (Simple CRUD interface)
- [ ] Hosting preference? (VPS/Serverless/PaaS)

---

## 🎯 Quick Start Guide for Backend Developer

### Step 1: Review Frontend
```bash
# Clone frontend repo
git clone [REPO_URL]
cd CoRE
npm install
npm run dev
```

### Step 2: Test Form Submissions
- Navigate to http://localhost:5173/contact
- Fill out the form and check browser console
- Review validation logic in `src/pages/Contact.jsx`

### Step 3: Set Up Backend
```bash
# Create new backend project
mkdir core-backend
cd core-backend
npm init -y
npm install express cors helmet dotenv
```

### Step 4: Implement Endpoints
- Start with `/api/applications` endpoint
- Test with Postman/Insomnia
- Add database integration
- Implement email notifications

### Step 5: Deploy
- Deploy backend to chosen platform
- Update frontend `.env` with API URL
- Test end-to-end flow

---

## 📝 Change Log

**Version 1.0 (Nov 24, 2025)**
- Initial documentation
- All frontend features documented
- API endpoints defined
- Security guidelines included

---

**END OF DOCUMENT**

This guide should be sufficient for any backend developer to build a complete backend system for the CoRE website. For questions or clarifications, please contact the frontend team.
