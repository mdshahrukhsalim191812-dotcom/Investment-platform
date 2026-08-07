# Investment Platform Backend

A production-ready backend built with Node.js, Express.js, MongoDB, and JWT authentication.

## Features

- User Registration & Login
- JWT Authentication
- Investment Management
- Referral System
- ROI Calculation
- Daily Cron Job
- Wallet Management
- REST APIs

## Tech Stack

- node.js
- express.js
- mongoDB
- mongoose
- jsonwebtoken
- bcrypt
- helmet
- node-cron
- zod
- crypto

## Project Structure

src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── cron/
├── validations/
├── app.js
server.js

## Installation

Clone repository

```bash
git clone <repository-url>
```

Install packages

```bash
npm install
```

## Environment Variables

Create a `.env` file.

```env
PORT=3000
MONGO_URI=mongodb+srv://shahrukhsalim8229090931_db_user:j70LT0c6wfjDSHCG@cluster0.qpuwprz.mongodb.net/task-for-interview
JWT_SECRET=0ef47d15cca6ab89737c844a90ae9c10ae0e599e633b8d7feb6e7f0853fce4c7
NODE_ENV=development
```

## Run Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Investment

POST /api/investment/create

GET /api/investment

### Dashboard

GET /api/dashboard

### Referral

GET /api/referral/direct

GET /api/referral/tree

## Security

- Password Hashing using bcrypt
- JWT Authentication
- Helmet Security
- CORS Enabled
- Input Validation

## Business Logic

- Daily ROI calculation
- Referral income distribution
- Wallet updates
- Transaction history
- Duplicate ROI prevention using cron safeguards

## Author

Md. Shahrukh Salim