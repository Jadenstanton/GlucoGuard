# GlucoGuard - Activity Tracker

GlucoGuard is an activity tracker that helps users monitor their daily activities and assess their susceptibility to diabetes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

Before running the project, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [React](https://reactjs.org/)
- [Python](https://www.python.org/)

## Getting Started

### Frontend

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/gluco-guard.git
   cd frontend/gluco-guard
   ```

2. **Install frontend dependencies:**

   ```
   npm install
   ```

3. **Start the React development server:**
   ```
   npm start
   ```
   Open your browser and go to http://localhost:3000 to view the app.

### Backend

    cd /backend

1.  **Create a virtual environment (venv):**
    ```
    python -m venv venv
    ```
2.  **Activate the virtual environment:**

    On Windows:

        venv\Scripts\activate

    On macOS and Linux:

        source venv/bin/activate

3.  **Install backend dependencies from requirements.txt:**
    ```
    pip install -r requirements.txt
    ```
4.  **Start the Flask server:**
    ```
    python app.py
    ```
    The Flask server should be running at http://localhost:5000.

### Usage

    Register: Create a user profile with your username, email, and other required information.

    Log In: Use your credentials to log in to your account.

    View Calendar: Access the activity calendar to monitor your daily activities and diabetes risk.

    Log Activities: Log your daily activities using the provided form or checklist.

### Project Structure

The project structure follows these conventions:

```
/project
├── /backend
│ ├── /api
│ │ ├── /controllers - Where the business logic for routes is defined.
│ │ ├── /routes - Defines the API endpoints.
│ │ └── /models - Database models.
│ ├── /database - Database-related files and scripts.
│ └── app.py - The main Flask application entry point.
├── /frontend
│ ├── /gluco-guard
│ │ ├── /node_modules - Contains all the npm dependencies.
│ │ ├── /public - Public static files for the React app.
│ │ ├── /src - Source files for the React app.
│ │ │ ├── /assets - General assets for the React app.
│ │ │ │ ├── /images - Images used in the React app.
│ │ │ │ └── /styles - Global stylesheets.
│ │ │ ├── /components - React components organized by feature.
│ │ │ │ ├── /activity - Components related to activity tracking.
│ │ │ │ ├── /auth - Authentication-related components.
│ │ │ │ ├── /common - Common reusable components.
│ │ │ │ └── /dashboard - Components for the user dashboard.
│ │ │ └── /services - Services for handling external operations.
│ │ └── ... - Other frontend-related files.
├── /migrations - Database migration files.
├── /myenv - Virtual environment for backend dependencies.
├── requirements.txt - Lists the backend Python dependencies.
└── config.py - Configuration file.
```

### Technologies Used

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Node.js](https://nodejs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [PostgreSQL](https://www.postgresql.org/)

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
