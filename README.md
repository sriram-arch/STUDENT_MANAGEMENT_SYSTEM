# 📚 Student Management System (SMS)

A full-stack web application to manage students, attendance, and dashboards. Built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**.

---

## 🗂️ Project Structure

```
SMS/
├── app.ts                  # Main server entry point
├── tsconfig.json           # TypeScript configuration
├── package.json            # Node.js dependencies & scripts
├── database/
│   └── db.ts               # PostgreSQL connection pool
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.ts            # Login API logic
├── signup/
│   ├── signup.html
│   ├── signup.css
│   └── signup.ts           # Signup API logic
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.ts        # Dashboard logic
└── attendance/
    ├── attendance.html
    └── attendance.css
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**

   Create a PostgreSQL database and update the connection details. Create a `.env` file in the root folder:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=sms_db
   ```

4. **Run the application**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:4000`

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Backend    | Node.js, Express.js           |
| Language   | TypeScript                    |
| Database   | PostgreSQL (via `pg` library) |
| Frontend   | HTML, CSS, Vanilla JS         |
| Dev Tools  | ts-node-dev                   |

---

## 📦 Dependencies

### Production
| Package  | Purpose                          |
|----------|----------------------------------|
| express  | Web server framework             |
| pg       | PostgreSQL client for Node.js    |
| cors     | Enable Cross-Origin requests     |

### Development
| Package        | Purpose                             |
|----------------|-------------------------------------|
| typescript     | TypeScript compiler                 |
| ts-node-dev    | Auto-restart server on file changes |
| @types/express | TypeScript types for Express        |
| @types/pg      | TypeScript types for pg             |
| @types/cors    | TypeScript types for cors           |

---

## ✨ Features

- 🔐 Student Login & Signup
- 📊 Dashboard with student overview
- 📋 Attendance tracking
- 🗄️ PostgreSQL database integration
- 🌐 REST API with Express

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
