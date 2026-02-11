# Sales Management Application

This project is a full-stack Sales Management application built using:

-   Backend: Django REST Framework
-   Frontend: ReactJS with Ant Design
-   Database: SQL Server

------------------------------------------------------------------------

## Prerequisites

-   Python 3.9+
-   Node.js 18+
-   npm
-   Database (SQL Server)

------------------------------------------------------------------------

## Backend Setup (Django)

1.  Navigate to backend folder

cd sales-backend

2.  Create virtual environment

3.  Install dependencies

pip install -r requirements.txt

4.  Start backend server

python manage.py runserver

Backend URL: http://localhost:8000/

------------------------------------------------------------------------

## Frontend Setup (React)

1.  Navigate to frontend folder

cd sales-ui

2.  Install dependencies

npm install

3.  Start React app

npm start

Frontend URL: http://localhost:3000/

------------------------------------------------------------------------

## Sample Data

Sample master data is available in the SQL file:

db.sqlite3

It contains: - Users - Countries - Cities - Products

Import this SQL file into the database before running the application.

------------------------------------------------------------------------

## API Base URL

http://localhost:8000/api/

------------------------------------------------------------------------

## Features

-   Create Sales
-   View Sales List
-   Filter Sales by User
-   Country → City cascading dropdown
-   Product-based sales entries
-   Responsive UI with Ant Design

------------------------------------------------------------------------



