# Akiba App

## Description
Akiba App is a financial savings and expense tracking application designed specifically for university students. The app helps students manage their finances by tracking their expenses setting savings goals as well as viewing upcoming payments and bills. By using Akiba App, students can gain better control over their financial situation, avoid unnecessary debt, and develop healthy financial habits.

## Project Setup/Installation Instructions

### Dependencies
- React
- React Bootstrap
- Firebase
- Font Awesome
- ExcelJS

### Installation Steps
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Garang-Diing/akiba-app.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd akiba-app
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
    Ensure the following dependencies are installed:
    ```bash
    npm install react react-dom
    npm install react-bootstrap bootstrap
    npm install firebase
    npm install @fortawesome/fontawesome-free
    npm install exceljs
    ```

4. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project.
   - Copy the Firebase configuration object.
   - Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```


## Usage Instructions

### How to Run
1. **Start the development server:**
    ```bash
    npm run dev
    ```
2. **Open your browser and navigate to:**
    ```
    https://localhost:5173
    ```

### Examples
- **Register a new account:** Click on the "Register" button and fill in your details.
- **Log in:** Use your registered email and password to log in.
- **Track expenses:** Navigate to the "Expenses" tab and add your expenses.
- **Set savings goals:** Go to the "Savings" tab to set and track your savings goals.

### Input/Output
- **Input:** User details (name, email, password), financial data (income, expenses, savings goals).
- **Output:** Visual representation of financial data, notifications for budget and savings targets.

## Project Structure

### Overview
- `src/`: Main source code directory.
  - `components/`: React components.
  - `pages/`: Application pages.
  - `firebase/`: Firebase configuration and initialization.
  - `assets/`: Static assets like images and icons.

  

  
### Project Tree
```
AKIBA-WEB-APPLICATION

├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Balance
│  │  │  ├─ AddAccount.tsx
│  │  │  └─ TotalBalanceCard.tsx
│  │  ├─ Bill
│  │  │  ├─ AllBills.tsx
│  │  │  └─ Bill.tsx
│  │  ├─ Expenses
│  │  │  ├─ ExpenseCard.jsx
│  │  │  ├─ MonthlyExpenses.tsx
│  │  │  └─ WeeklyComparisonGraph.tsx
│  │  ├─ Footer
│  │  │  └─ Footer.tsx
│  │  ├─ footer.tsx
│  │  ├─ Goals
│  │  │  └─ Goals.tsx
│  │  ├─ Header
│  │  │  └─ Header.tsx
│  │  ├─ navbar.tsx
│  │  ├─ privateroute.tsx
│  │  ├─ Sidebar
│  │  │  └─ Sidebar.tsx
│  │  └─ Transactions
│  │     ├─ AllTransactions.tsx
│  │     └─ Transactions.tsx
│  ├─ config
│  │  └─ firebase.tsx
│  ├─ contexts
│  │  └─ AuthContext.tsx
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Balances
│  │  │  └─ Balances.tsx
│  │  ├─ Bills
│  │  │  └─ Bills.tsx
│  │  ├─ Dashboard
│  │  │  └─ Dashboard.tsx
│  │  ├─ Expenses
│  │  │  └─ Expenses.tsx
│  │  ├─ Goals
│  │  │  └─ Goals.jsx
│  │  ├─ home.tsx
│  │  ├─ landing-page.tsx
│  │  ├─ lock-screen.tsx
│  │  ├─ login.tsx
│  │  ├─ Profile
│  │  │  └─ userprofile.tsx
│  │  ├─ register.tsx
│  │  ├─ reset-password.tsx
│  │  ├─ Transactions
│  │  │  └─ Transactions.tsx
│  │  └─ UploadStatement
│  │     └─ UploadStatement.tsx
│  ├─ services
│  │  └─ authService.tsx
│  ├─ utils
│  │  └─ errorMessages.tsx
│  └─ vite-env.d.ts
├─ storage.rules
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### Key Files
- `src/App.tsx`: Main application component.
- `src/index.tsx`: Entry point of the application.
- `src/config/firebase.tsx`: Firebase configuration and initialization.
- `src/pages/Profile/userdetails.tsx`: User profile details page.
- `src/components/ExpenseTracker.tsx`: Component for tracking expenses.
- `src/components/AddAcount.tsx` : Component for adding an account.
- `src/components/Bills.tsx` : Component for viewing upcoming payments and bills.

## Additional Sections (Optional)

### Project Status
- **In Progress:** We are continuously adding new features and improving the existing functionality.

### Known Issues
- **Bug:** Sometimes the expense tracker does not update immediately after adding a new expense.
- **Limitation:** Currently, the app does not support multiple currencies.

### Acknowledgements
- **React:** [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Firebase:** [Firebase Documentation](https://firebase.google.com/docs)
- **React Bootstrap:** [React Bootstrap Documentation](https://react-bootstrap.github.io/getting-started/introduction/)
- **Font Awesome:** [Font Awesome Documentation](https://fontawesome.com/)

### Licenses
- **React:** [MIT License](https://github.com/facebook/react/blob/main/LICENSE)
- **React Bootstrap:** [MIT License](https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE)
- **Firebase:** [Apache License 2.0](https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE)
- **Font Awesome:** [Font Awesome Free License](https://fontawesome.com/license/free)

### Contact Information
For any questions or feedback, please open an issue on the GitHub repository.


