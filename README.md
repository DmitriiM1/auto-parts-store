# Auto-Parts-Store

Full-stack web application of an online auto parts store.
Project demonstrates backend API development, database design, admin panel, authentication logic, cart system, and modern React frontend.

# Frontend: https://auto-parts-store-1.onrender.com/ 

# Backend: https://auto-parts-store-fa9b.onrender.com/ 

    Web Stack:

Backend
	•	Node.js
	•	NestJS
	•	Prisma ORM
	•	PostgreSQL
	•	Prisma Accelerate
	•	Swagger (API Docs)
	•	Render (Deployment)

Frontend
	•	React + TypeScript
	•	Vite
	•	Tailwind CSS
	•	React Router
	•	Context API (Cart, Auth)
	•	Render (Deployment)

    Features:

Public Features (Customer)
	•	View products list
	•	Search by name / brand / SKU
	•	Filter by category
	•	Filter by price range
	•	Pagination
	•	Product images
	•	Responsive UI (mobile + desktop)
	•	Sign In page (local auth simulation)
	•	Cart system (local storage)
	•	Add to Cart (only if signed in)
	•	Cart page:
	•	List of items
	•	Quantity control
	•	Total price
	•	Remove items

Admin Features
	•	Admin Products Page
	•	Create new product
	•	Uses Admin Guard (token based)
	•	Validation of inputs
	•	Categories & Brands loading from API
	•	Swagger testing

Backend Features
	•	REST API
	•	Prisma ORM
	•	PostgreSQL database
	•	DTO validation
	•	Query validation
	•	Pagination
	•	Relations (Product → Category)
	•	Swagger documentation
	•	CORS configured
	•	Environment variables support
	•	Render deployment ready

    API Endpoints:

Products
	•	GET /products
	•	GET /products/:id
	•	POST /products (Admin)

Categories
	•	GET /categories

Brands
	•	GET /brands

