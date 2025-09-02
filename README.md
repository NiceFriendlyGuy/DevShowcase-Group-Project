# DevShowcase – Admin Dashboard

This project is part of a group course project for the *Certificat Développeur Fullstack MEAN*.  
**DevShowcase** is a platform where developers can showcase their projects, stacks, and portfolios, while recruiters can browse profiles to find promising candidates.  

The application is structured into three main parts:
- **frontend_user** (Angular 19)
- **frontend_admin** (Angular 19) ← *my contribution*
- **backend** (Node.js / Express / MongoDB)

---

## 👨‍💻 My Contribution: Frontend Admin Dashboard

I worked on the **frontend_admin** part of the project, developing an **admin dashboard** with the following features:

- **Authentication**: Login system for admins using **JWT** to restrict access.  
- **User Management**:  
  - User list with **search bar**  
  - Admin actions: reset password, delete account, change name  
- **Stats & Charts**:  
  - Displayed statistics about users and projects  
  - **Doughnut charts** and **bar/line charts** for better visualization  
- **Notification Board**:  
  - Display of admin-related messages such as reports, requests, and alerts  

---

## 🛠️ Tech Stack

- **Frontend**: Angular 19 
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB  
- **Auth**: JWT (JSON Web Tokens)  

---

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies for each part (user, admin, backend):

```bash
# Clone repo
git clone https://github.com/NiceFriendlyGuy/DevShowcase-Group-Project.git
cd DevShowcase-Group-Project

# Install backend
cd backend
npm install

# Install frontend_admin
cd ../frontend_admin
npm install

# Install frontend_user
cd ../frontend_user
npm install
```

### Development Servers

```bash
# Run backend (port 3000 by default)
cd backend
npm start

# Run admin frontend (Angular)
cd ../frontend_admin
ng serve -o

# Run user frontend (Angular)
cd ../frontend_user
ng serve -o
```

---

## 📂 Project Structure (High-Level)

```plaintext
devshowcase/
  ├── backend/          # Node.js/Express/MongoDB backend
  ├── frontend_user/    # Angular 19 user-facing app
  ├── frontend_admin/   # Angular 19 admin dashboard (my part)
```

---

## 🎯 Learning Goals

Through this project I practiced:
- Building an **admin dashboard** in Angular 19.  
- Using **JWT authentication** for role-based access.  
- Implementing **charts** and **data visualizations** in a real project.  
- Applying **Angular best practices** (signals, modularization, component-driven design).  
- Collaborating in a **fullstack MEAN environment**.  

---

## 📜 License

This project was built in a course context and is for **educational purposes only**.  
Not licensed for commercial use.

---

## 🙌 Acknowledgements

- Thanks to my teammates for their work on the user frontend and backend.  
- Libraries used: Chart.js (for charts), JWT libraries for authentication.  
