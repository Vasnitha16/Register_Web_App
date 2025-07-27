# Register_Web_App

# AI Use Case Register Web App

A web-based application for registering and managing AI use cases. This app allows authenticated users to add, view, edit, and delete AI use cases, track model performance metrics like accuracy over time, and store detailed rich-text descriptions with images for each use case.

---

## Features

- User authentication (registration & login)
- Dashboard to manage AI use cases
- Add, edit, and delete use cases
- View detailed use case pages with:
  - Business Owner, Risk Level, Category, Model Info, KPIs, Benefits, etc.
  - Rich text description (with image support using React Quill)
- Track model accuracy trends over past 3 months
- Export use cases (optional CSV/Excel)
- Clean and responsive UI

---

## Tech Stack

### Frontend
- [React.js (Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Quill](https://github.com/zenoamaro/react-quill) (for rich text editing)
- Axios (for API requests)

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [MySQL](https://www.mysql.com/)
- [MySQL Connector Python](https://pypi.org/project/mysql-connector-python/)
- SHA-256 for password hashing

---

## 🗃️ Database Schema (MySQL)

**Users Table**
```sql
user_credentials(id, username, password_hash)

