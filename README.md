# Admin Dashboard

This is an admin dashboard for managing users and roles, which stores the data in the browser's `localStorage`. The application allows users to be added, edited, and deleted, as well as roles to be created and assigned to users. All data is persisted across browser refreshes using `localStorage`.

## Features

- **Role Management**:
  - Add new roles.
  - Edit existing roles.
  - Delete roles.
  - Each role can have multiple permissions (Read, Write, Delete).
  
- **User Management**:
  - Add new users.
  - Edit existing users.
  - Delete users.
  - Assign roles to users.
  - Set user status (Active/Inactive).
  
- **Data Persistence**:
  - All roles and users are stored in `localStorage`, ensuring the data persists across page refreshes.

## Prerequisites

Before you run the application, make sure you have the following installed:

- Node.js (v14 or above)
- npm (Node Package Manager)

## Getting Started

Follow the steps below to run the app on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```
### 2. Install Dependencies
In the project directory, run the following command to install the required dependencies:

```bash
Copy code
npm install
```
### 3. Run the Application
After installing dependencies, run the following command to start the app:

```bash
Copy code
npm start
```
The app will be available at http://localhost:3000 in your browser.

## Using the Admin Dashboard
Once the application is running, follow these steps:

### 1. Add Roles
Before you can add any users, you need to first create at least one role. Here’s how:

  -Navigate to the Role Management section.
  -Click on the + Add Role button.
  -Enter the Role Name and assign any desired permissions (Read, Write, Delete).
  -Click Save to add the role.
### 2. Add Users
After creating roles, you can start adding users. Here’s how:

  -Navigate to the User Management section.
  -Click on the + Add User button.
  -Enter the User's Name, Email(Email should be unique as each user  will  identified uniquely be it E-mail), select a Role(from the existing roles), and choose a Status (Active/Inactive).
  -Click Save to add the user.
### 3. Editing and Deleting Users/Roles
You can also edit and delete users and roles:
  -To edit, click the Edit button next to a user or role.
  -To delete, click the Delete button next to a user or role.
### 4. Data Persistence
All roles and users will be saved in the browser's localStorage. This ensures that your data persists even after a page refresh.
### 5. Search
You can search for users or roles by typing in the search box at the top of the respective management sections.
### Local Storage
  -Roles and users are stored in localStorage as follows:
  -Roles: Stored under the key roles.
  -Users: Stored under the key users.
  -The data is automatically loaded from localStorage when the app starts, ensuring that no data is lost on refresh.

## File Structure
Here’s an overview of the file structure:

```bash
Copy code
/src
  /components
    - UserManagement.js      # User management page
    - UserModal.js           # Modal to add/edit users
    - RoleManagement.js      # Role management page
    - RoleModal.js           # Modal to add/edit roles
  /context
    - RBACContext.js         # Context for managing users and roles
  /styles
    - UserManagement.css     # Styles for user management
    - RoleManagement.css     # Styles for role management
    - UserModal.css          # Styles for user modal
    - RoleModal.css          # Styles for role modal
  - App.js                   # Main application component
  - index.js                 # Entry point of the app
  - README.md                # This file
```
## Troubleshooting
### 1. Local Storage Not Persisting Data
Ensure your browser is not in Incognito or Private mode, as local storage may not persist in those cases.
Check the browser’s developer console for any errors related to local storage.
### 2. Roles or Users Not Displaying After Refresh
Ensure that you have added roles first, as users cannot be added without roles. The app fetches roles from localStorage when it loads.
## Contributing
Feel free to fork this repository and submit pull requests for any improvements or bug fixes.
