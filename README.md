# Budgeteer - Expense Tracker

Budgeteer is a comprehensive personal expense tracker designed to help users monitor and manage their finances effectively. The dashboard provides a centralized platform to track total balance, budget, expenses, and savings, with detailed budget breakdowns and visual representations of financial data to assist users in making informed financial decisions.

## Database schema

![logo](/public/database schema.png)

## Features

-   User Authentication:

    -   User registration/login and access control.
    -   Login with existing credentials
    -   Secure password hashing using bcryptjs

-   User Profile Management:

    -   Manage account settings including upload and update profile, name, and other details.

-   Expenses:

    -   Display list of expenses with date, amount, title, method, and category.
    -   Pagination to manage and navigate through the list of expenses.

-   Expenses Sharing:

    -   Enable multiple users to collaborate on budgeting and expense tracking. Allow users to invite family members or roommates to share access to budgets and expenses.

-   Budget Tracking:

    -   Charts to display budget allocation and usage.
    -   Categorize budget into categories such as Food, Clothes, Utilities, and Transportation.

-   Saving Goals:

    -   Display saving goals with progress bars indicating the percentage saved towards goals like a laptop, new car, or new house

-   Responsive Design:
    -   Mobile-friendly interface
    -   Adaptive layout for various screen sizes

## Tech Stack

-   Frontend:

    -   HTML5
    -   TypeScript
    -   Sass

-   Backend:

    -   Node.js
    -   Express.js

-   Database:

    -   PostgreSQL
    -   Knex

-   Validation:

    -   Joi

-   Authentication:
    -   JSON Web Tokens (JWT)

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v18 or later)
-   npm
-   PostgreSQL

## Setup

1. Clone the repository:

```sh

git clone https://github.com/Ganesh896/Budgeteer_/tree/master
cd client & npm i
cd server & npm i

```

2. Set up environment variables by looking .env.example file: Create a `.env` file in the root directory and add the following
3. Set up the database:
4. npm run migrate

```sh
    npm run start
```

5. Start frontend

```sh
    npm run dev
```

## API Endpoints

### User Management

-   POST `/api/user/register`

    -   Description: Register a new user
    -   Body: User registration data (validated by registerUserBodySchema)

-   POST `/api/user/login`

    -   Description: Authenticate a user
    -   Body: Login credentials (validated by loginBodySchema)

-   GET `/api/user/uer-details`

    -   Description: Get the current user's profile
    -   Authentication: Required

-   PUT `/api/user/update-profile`

    -   Description: Update user's profile picture
    -   Authentication: Required
    -   Body: Form-data with 'profile' file

-   PUT `/api/user/update`

    -   Description: Update user's information
    -   Authentication: Required
    -   Body: User update data (validated by updateBodySchema)

Note: All endpoints are prefixed with `/api/user`. Authentication is handled by the `authenticate` middleware where required.

### Expenses

-   POST `/api/expense/add`

    -   Description: Add new expense
    -   Authentication: Required
    -   Body: data (validated by expenseReqBodySchema)

-   GET `/api/expense`

    -   Description: Get the current user's expenses
    -   Authentication: Required

-   GET `/api/expense/:expenseId`

    -   Description: Get an expense by its ID
    -   Authentication: Required

-   GET `/api/expense/category`

    -   Description: Get expense category
    -   Authentication: Required

-   PUT `/api/expense/update/:id`

    -   Description: Update an expense
    -   Authentication: Required

-   DELETE `/api/expense/delete/:id`

    -   Description: Delete an expense by its ID
    -   Authentication: Required

Note: All endpoints are prefixed with `/api/expense`. Authentication is handled by the `authenticate` middleware where required. Some endpoints have additional authorization or validation middleware.

### Expense Group

-   POST `/api/group/add`

    -   Description: Add new group
    -   Authentication: Required

-   GET `/api/group`

    -   Description: Get the current user's group
    -   Authentication: Required

-   POST `/api/group/user`

    -   Description: Add user to group
    -   Authentication: Required

-   GET `/api/group/users/:groupId`

    -   Description: Get group users
    -   Authentication: Required

-   POST `/api/group/invite`

    -   Description: Sent invite to other user
    -   Authentication: Required

-   GET `/api/group/invite`

    -   Description: Get current user group invitation
    -   Authentication: Required

-   GET `/api/group/expenses/:groupId`

    -   Description: Get group expenses by id
    -   Authentication: Required

-   DELETE `/api/group/invite/:groupId`

    -   Description: Delete group invitation
    -   Authentication: Required

Note: All endpoints are prefixed with `/api/group`. Authentication is required for all endpoints and is handled by the `authenticate` middleware.

### Budget

-   POST `/api/budget/add`

    -   Description: Add budget
    -   Authentication: Required

-   GET `/api/budget`

    -   Description: Get budget
    -   Authentication: Required

    Note: All endpoints are prefixed with `/api/budget`. Authentication is required for all endpoints and is handled by the `authenticate` middleware.

### Saving Goals

-   POST `/api/saving-goal/add`

    -   Description: Add saving Goal
    -   Authentication: Required

-   GET `/api/saving-goal`

    -   Description: Get saving Goal
    -   Authentication: Required

    Note: All endpoints are prefixed with `/api/saving-goal`. Authentication is required for all endpoints and is handled by the `authenticate` middleware.
