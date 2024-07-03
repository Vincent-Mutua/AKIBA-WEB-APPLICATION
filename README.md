# Akiba App

Akiba App is a student financial application built with React and Firebase, designed to manage finances efficiently for students.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Akiba App helps students track their expenses, manage budgets, and plan finances effectively. It leverages React for the frontend user interface and Firebase for the backend to provide real-time data synchronization and secure authentication.

### Features

- **Expense Tracking:** Record and categorize expenses to monitor spending habits.
- **Budget Management:** Set budgets and receive alerts when nearing budget limits.
- **Financial Planning:** Plan future expenses and savings goals.
- **Secure Authentication:** Firebase Authentication ensures secure login and user management.

### Installation

To run Akiba App locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Vincent-Mutua/akiba-app.git
   cd akiba-app
2. Install dependencies:
   ```bash
   npm install
   
3. Set up Firebase
- Create a Firebase project at Firebase Console.
- Copy Firebase configuration settings (apiKey, authDomain, projectId, etc.) from Firebase 
    Console
- Create a .env file in the root directory:
    
   ```makefile
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

4. Start the development server
   ```bash
   npm run dev

5. Copy the generated browser URL
makefile
   Example:
   http://localhost:3000 in your browser to view the app.

### Usage
- Register or login using Firebase Authentication.
- Navigate through the app to manage expenses, budgets, and financial goals.
- Update profile information and preferences securely.

### Technologies Used
- React
- Firebase Authentication
- Firebase Firestore (or Realtime Database)
- Firebase Storage

### Contributing
We welcome contributions to Akiba App! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature/your-feature).
6. Create a new Pull Request.

Please have a look at our contributing guidelines and code of conduct before contributing.


