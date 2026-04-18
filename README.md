Capstone Project

Overview

This is a full-stack web application with a frontend built using Vite + React and a backend API. The app allows users to view and interact with product data.

Project Structure

```
Capstone/
│── backend/        # API server
│── frontend/       # Vite + React client
│── README.md
```


Tech Stack

Frontend

* React
* Vite
* JavaScript (ES6+)

Backend

* Node.js
* Express


Getting Started

1. Clone the repository

```
git clone <your-repo-url>
cd Capstone
```


2. Install dependencies

Backend

```
cd backend
npm install
```

Frontend

```
cd ../frontend
npm install
```


Running the Application

Start Backend

```
cd backend
npm run dev
```

Server should run on:

```
http://localhost:5001
```


Start Frontend

```
cd frontend
npm run dev
```

App should run on:

```
http://localhost:5173
```


API Connection

Make sure your frontend is calling the backend correctly.

Example:

```js
fetch("http://localhost:5001/api/products")
```

If this fails:

* Ensure backend is running
* Check route exists
* Verify CORS is enabled


Common Issues

1. 404 on frontend

* Missing `index.html`
* Wrong working directory

2. Failed to fetch

* Backend not running
* Incorrect API URL
* CORS not configured

3. Port conflicts

```
lsof -i :5173
lsof -i :5001
```


Environment Variables (Optional)

Create `.env` files if needed.

Example:

```
VITE_API_URL=http://localhost:5001
```


Future Improvements

* Authentication
* Database integration
* Deployment (Vercel / Render)


Author

Baidaho Zanre

