# 🚀 BuyNest E-Commerce Platform

BuyNest is a **scalable** and **feature-rich** e-commerce platform built with **Node.js, Express, and PostgreSQL**. This platform includes:
- 🛒 **User Authentication**
- 📦 **Product Management**
- ☁️ **AWS S3 Integration** for file uploads

---

## 📌 Project Setup and Initialization

Follow these steps to set up and initialize the project:

### 📥 Clone the Repository

```bash
git clone <repository-url>
cd buynest
npm install
```

### 🔑 Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
NODE=production
JWTSECRET=your_jwt_secret
DB_URL=postgresql://postgres:root@localhost:5432/buynest
ACCESS_ID=your_aws_access_key_id
SECRET_ACCESS_ID=your_aws_secret_access_key
REGION=your_aws_region
BUCKET=your_s3_bucket_name
```

### 🛠 Database Setup
Run the following commands to sync and seed the database:

```bash
npm run db:sync
npm run db:seed
```

### 🚀 Start the Development Server

```bash
npm run dev
```

---

Happy coding! 🎉