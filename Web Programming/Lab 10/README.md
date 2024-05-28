# CS-546 Lab 10 Summary

## Description
This lab, is a basic server with user sign-up and login functionalities, along with middleware for authentication and logging. Key components include:

# Example Image
![Register Page](image.png)

- **User Registration:** Store user details like name, username, hashed password, favorite quote, theme preference, and role.
- **User Login:** Authenticate users and manage sessions using `express-session`.
- **Middleware:** Implement middleware for logging requests and protecting routes based on user roles.
- **Database Structure:** Define a MongoDB schema for user data.

## Packages
- `bcrypt`: For password hashing.
- `express-session`: For session management.

## Database
- Database: `FirstName_LastName_lab10`
- Collection: `users`
- Sample Schema: { _id, firstName, lastName, username, password, favoriteQuote, themePreference, role }

## Data Module
Create a `users.js` module with functions:
1. `registerUser()`: Validate and store user details.
2. `loginUser()`: Authenticate users.

## Routes
- `/`: Redirect based on user authentication and role.
- `/login`: Render login form.
- `/register`: Render sign-up form.
- `/user`: User dashboard.
- `/admin`: Admin dashboard.
- `/logout`: Logout and redirect to login.

## Middleware
1. Log request details.
2. Redirect authenticated users from login/register routes.
3. Protect user/register routes from logged-in users.
4. Protect user/admin routes based on roles.
5. Handle logout and redirect.

## Client-Side Validation
- Client-side validation for all forms.
- Ensure password and confirm password match on registration.

## Session Management
- Initialize `express-session` middleware in `app.js`.
- Store user session data for authentication.

