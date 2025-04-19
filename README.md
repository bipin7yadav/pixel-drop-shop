
# PixelMart - E-Commerce Platform

PixelMart is a modern e-commerce platform built with React, TypeScript, and Supabase.

**URL**: https://021bfa12-890d-4d0e-ad0a-fcf68e2cb189.lovableproject.com

## Features

- Product catalog with categories and filters
- User authentication system with role-based access
- Shopping cart functionality
- Admin dashboard for product management
- Seller portal for managing products

## Admin and Seller Access

### Default Admin Login
- **Email**: admin@pixelmart.com
- **Password**: Admin123!

As an admin user, you can:
- Access the admin dashboard
- Manage all products and categories
- View and manage all orders
- Manage user accounts

### Default Seller Login
- **Email**: seller@pixelmart.com
- **Password**: Seller123!

As a seller user, you can:
- Access the seller dashboard
- Manage your own products
- View and manage your orders

### Testing Admin and Seller Access

1. Navigate to the login page (/login)
2. Enter the admin or seller credentials
3. Once logged in, you'll be redirected to the dashboard
4. For admin users, you'll see all management options
5. For seller users, you'll only see options related to your products

## Project Setup

If you want to work locally using your own IDE, you can clone this repo and push changes.

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Authentication, Database, Storage)

## Deploying the Project

To deploy this project, navigate to [Lovable](https://lovable.dev/projects/021bfa12-890d-4d0e-ad0a-fcf68e2cb189) and click on Share -> Publish.

## Custom Domain

You can connect a custom domain by going to Project > Settings > Domains and clicking Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
