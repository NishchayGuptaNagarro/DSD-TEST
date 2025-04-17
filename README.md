# NE-Warehouse-Admin-Frontend

This document provides an overview of the React based project named `NEWarehouseAdmin-Frontend`. The project is supports React version 16.8.0+.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Requirements for Deployment](#requirements-for-deployment)
- [Setup](#setup)
- [Steps for running](#steps-for-running)
- [Steps for deployment](#steps-for-deployment)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev-Dependencies](#dev-dependencies)
- [Conclusion](#conclusion)

## Introduction

This is a React-based web application built for warehouse administrators. It enables efficient management of drivers, orders, and stock through an intuitive interface. The app streamlines daily warehouse operations by connecting seamlessly with the backend system.

## Requirements

- Node.js 16+

## Requirements for Deployment

- WSL (for running a Linux-based environment on Windows)
- Docker (for containerizing the application)
- Cloud Foundry CLI (for deploying to Cloud Foundry)

## Setup

1. Open cmd and navigate to project folder
2. run 'npm install' in project terminal

## Steps for running:

1. run 'npm run dev' on your terminal.
2. now run chrome using 'win + r' and run command 'chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security'.
3. This command is to disable cors check for api request.
4. Then go to 'http://localhost:5173'.
5. app is also deployed on vercel, so you can also check it at 'https://ne-warehouse-admin.vercel.app/'

## Steps for deployment

1. Open your terminal inside WSL.
2. run 'docker build -t notionedge984/warehouse-frontend:2.5.1-20250416 .'
3. run 'docker push notionedge984/warehouse-frontend:2.5.1-20250416'
4. run 'cf login -a https://<base-url>.hana.ondemand.com/'
5. Enter the username and password
6. run 'cf push warehouse-frontend -o notionedge984/warehouse-frontend:2.5.1-20250416'

## Project Structure

The project has the following structure

```plaintext
├── ./
    ├── .vercel
    ├── coverage
    ├── dist
    ├── node_modules
    ├── public
    ├── src/
        ├───api
        ├───assets
        │   ├───LOTTIE
        │   ├───PNG
        │   ├───SVG
        │   └───WEBP
        ├───component
        │   ├───AlertDialog
        │   │   └───propTypes
        │   ├───BlueBorderButton
        │   ├───BlueButton
        │   ├───ColumnHeader
        │   │   └───propTypes
        │   ├───DetailsCard
        │   │   └───propTypes
        │   ├───DriverNameGridHeader
        │   │   └───propTypes
        │   ├───DriverSelectionGrid
        │   │   ├───DriverCard
        │   │   │   └───propTypes
        │   │   └───propTypes
        │   ├───DropDownButton
        │   │   └───propTypes
        │   ├───Header
        │   │   └───propTypes
        │   ├───InfoAlertDialog
        │   │   └───propTypes
        │   ├───InfoTooltip
        │   │   └───propTypes
        │   ├───LanguageSelect
        │   ├───NavigationCard
        │   │   └───propTypes
        │   ├───PageDetails
        │   │   └───propTypes
        │   ├───PageHeading
        │   │   └───propTypes
        │   ├───ProductIcon
        │   │   └───propTypes
        │   ├───ProtectedRoute
        │   │   └───propTypes
        │   ├───ScreenLayout
        │   │   └───propTypes
        │   ├───SidebarNew
        │   │   └───propTypes
        │   ├───SignOutSelect
        │   ├───Table
        │   │   └───propTypes
        │   ├───TableDialogContent
        │   │   └───propTypes
        │   └───Timeline
        ├───context
        │   ├───sidebar
        │   │   └───sidebarProps
        │   └───timeline
        │       └───timelineProps
        ├───mockServices
        ├───models
        ├───resources
        │   └───labels
        ├───screens
        │   ├───AllHistory
        │   │   └───AllHistoryTable
        │   │       ├───AllHistoryColDef
        │   │       └───propTypes
        │   ├───ForgotPassword
        │   ├───Home
        │   ├───Loading
        │   ├───Login
        │   │   └───propTypes
        │   ├───StockCheckIn
        │   │   ├───AdminSignature
        │   │   │   └───propTypes
        │   │   ├───AttachmentTable
        │   │   ├───PendingSelectionGrid
        │   │   ├───propTypes
        │   │   ├───StockTable
        │   │   └───TransactionTable
        │   └───StockCheckOut
        │       ├───DeliveryTable
        │       │   ├───DeliveryColDef
        │       │   └───propTypes
        │       ├───DriverNameGrid
        │       ├───DriverSignature
        │       │   └───propTypes
        │       ├───MyOrder
        │       │   ├───MyOrderCol
        │       │   └───propTypes
        │       ├───OrderTable
        │       │   └───OrderColDef
        │       ├───ProductsTable
        │       │   ├───ProductsColDef
        │       │   └───propTypes
        │       └───propTypes
        ├───styles
        └───utilities
            ├───AttachmentColDef
            ├───commonTransactionColDef
            ├───DeliveryTransactionColDef
            ├───StockColDef
            └───VanSellerTransactionColDef

```

## Coding Conventions

1. Traditional function syntax for component declarations and callbacks. For example:

```
// Preferred
function MyComponent() { ... }
// Avoid
const MyComponent = () => { ... }

```

2. Destructuring is used wherever applicable for cleaner props and state access. For example:
   'const { title, onPress } = props;'

3. Consistent naming conventions for files and variables:

- Component files: PascalCase (e.g., BottomSheet.tsx)
- Variables, functions: camelCase

4. Styles are defined in a .scss file (e.g., DetailsCard.scss) and MUI styles to be defined using 'sx' property of that MUI element.

5. Functional, reusable components are preferred. Components follow a component-centric modular structure:
   /components
   └── DetailsCard/
   └───propTypes
   types.ts (Type definitions (props, enums, etc.))
   ├── DetailsCard.tsx (Component logic)
   ├── DetailsCard.scss (Styling file)
   ├── DetailsCard.test.tsx (Unit tests)
   ├── DetailsCard.md (Documentation)

## Scripts:

1. dev: Starts the development mockServer using Vite.
2. build: Compiles TypeScript code & Builds the application for production using Vite.
3. lint: Runs ESLint for linting TypeScript and JavaScript files with additional options.
4. preview: Runs production build.
5. format: Checks code formatting using Prettier.
6. format:fix : Fixes code formatting using Prettier.
7. test: Runs tests using Jest.
8. test:watch : Runs tests in watch mode using Jest.

## Dependencies:

1. Material UI: UI component library for React with Google's Material Design.
2. axios: Promise-based HTTP client for making API requests in React applications.
3. date-fns: Utility library for working with dates and times in JavaScript.
4. formik: Form management library for React that simplifies handling form state, validation, and submission
5. i18next: Internationalization library for React applications to support multiple languages.
6. react: JavaScript library for building user interfaces. (Core dependency for most React projects)
7. yup: Object schema validation library commonly used for form validation in React applications.
8. react-router: Routing library for managing navigation within a React application.
9. react-spinners: Library for adding loading spinners to React applications.

## Dev-Dependencies:

1. prettier: Code formatter that enforces consistent code style across your project.
2. es-lint: Static code analysis tool for identifying and fixing code quality issues in JavaScript projects.
3. sass: CSS preprocessor language that extends CSS with features like variables, mixins, and nesting for more maintainable styles.
4. typescript: Statically typed superset of JavaScript that adds optional types for improved code safety and maintainability.
5. vite: Modern build tool for developing and optimizing web applications, known for its fast development experience.
6. jest: Modern build tool for developing and optimizing web applications, known for its fast development experience.
7. react-testing-library: A lightweight library for testing React components with a focus on mimicking user interactions.

## Conclusion

This overview covers the key configurations and steps for running and deploying the `NEWarehouseAdmin-Frontend` React project. Make sure to adjust configurations and dependencies based on your development and deployment needs.
