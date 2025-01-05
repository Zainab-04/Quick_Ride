# UBER Clone Web App

A full-stack web application built using the MERN stack that replicates the core functionalities of Uber. This app includes user and captain registration and login, ride requests, real-time geolocation, fare calculation, and ride management.

## Features

- **User and Captain Authentication**
  - Secure registration and login for users and captains.

- **Ride Management**
  - Users can create ride requests, select a vehicle, and confirm rides.
  - Captains can accept ride requests, verify OTP, and manage rides.

- **Geolocation and Fare Calculation**
  - Real-time geolocation using Google Maps APIs.
  - Dynamic fare calculation based on travel distance and time.

- **Real-Time Communication**
  - Socket.IO integration for live updates between users and captains.

- **Enhanced User Experience**
  - Location suggestions with Google Maps APIs.
  - Optimized input handling using debounce techniques.

## Technologies Used

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Socket.io** for real-time communication
- **jsonwebtoken** for secure authentication
- **bcrypt** for password hashing
- **dotenv** for environment variable management
- **morgan** for HTTP request logging
- **express-validator** for request validation
- **cookie-parser** for handling cookies
- **nodemon** for development server monitoring

### Frontend
- **React.js** for user interface
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for API requests
- **Socket.io Client** for real-time updates
- **lodash.debounce** for optimized user input handling
- **Lucide React** for icons

### APIs and Libraries
- **Google Maps APIs**:
  - Distance Matrix API
  - Places API
  - Geolocation API
- **Socket.io** for real-time updates

