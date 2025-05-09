# Student Management System

A React Native application for managing student profiles with features for adding, editing, searching, and exporting student data.

## Setup Instructions

### 1. Install Dependencies

Clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### 2. Configure API URL

You need to update the API URL with your current IP address:

1. Open a command prompt and run:

   ```bash
   ipconfig
   ```

   (On macOS/Linux, use `ifconfig` instead)

2. Note your IPv4 address (e.g., 192.168.1.100)

3. Update the API URL in the `constants/api.ts` file:
   ```typescript
   // Replace with your IP address
   export const API_URL = 'http://192.168.1.100:3000';
   ```

### 3. Start the JSON Server

The application uses JSON Server as a mock backend:

```bash
npx json-server db.json
```

This will start the server at http://localhost:3000 (or your configured IP address).

### 4. Start the Application

Start the Expo development server:

```bash
npm expo start
```

For the best experience, use Expo Go on your physical device by scanning the QR code. Development builds may not be available.

## Features

### Student Management

- **Add Students**: Record comprehensive student information including:

  - Name
  - Email
  - Enrollment Status (Enrolled, Graduated, Alumni)
  - Profile Photo (with file type and size restrictions)
  - Phone Number (Formatted for standard Nigerian numbers)
  - Address

- **Edit Students**: Update any student information as needed

- **Delete Students**: Remove students from the system

### Search & Filter

- **Search**: Quickly find students by searching their information
- **Filter**: Filter students by enrollment status (Enrolled, Graduated, Alumni)
- **Sort**: Organize students by name, email, or date added

### Data Management

- **Clear Cache**: Reset application cache when needed
- **Export Data**: Export student records in JSON format for backup or analysis
