# 🛍️ Product Catalog Frontend

A modern web application for displaying and managing a product catalog.  
Built with **React**, **Redux Toolkit**, and **Vite**, it provides a fast and scalable architecture for e-commerce or showcase projects.

Production server: https://portfolio-e-commerce-zlny.onrender.com/

Test server: https://portfolio-e-commerce-1-na8n.onrender.com

---

## 🚀 Tech Stack

- ⚛️ **React 18** — UI library
- 🧭 **React Router v6** — client-side routing
- 🧩 **Redux Toolkit** — state management
- ⚡ **Vite** — modern build tool
- 🧪 **Jest + React Testing Library** — unit and integration tests
- 🎨 **CSS Modules / Styled Components** (choose your approach)
- 📄 **OpenAPI (YAML)** — API documentation

---

## 🧱 Project Structure

```
src/
├── app/              # App setup (store, router, global styles)
├── components/       # Reusable UI components
├── features/         # Redux feature slices
├── pages/            # Route-level pages
├── services/         # API logic (RTK Query or fetch)
└── types/            # TypeScript types and interfaces
```

---

## 🎨 Design

👉 [Figma / Design link goes here](https://www.figma.com/design/h94EgrKvApTfFxclNPJjqw/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page--Community---Copy-?node-id=0-1&p=f&t=zOHXyHw7zIu662HK-0)

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/product-catalog.git

# 2. Navigate to the project folder
cd product-catalog

# 3. Install dependencies
npm install

# 4. Run the app
npm run dev
```

App will start at:  
➡️ `http://localhost:5173`

---

## 🧾 API

The backend is a `json-server` instance with custom routes. All endpoints are prefixed with `/api`.

### Available Endpoints

-   `GET /api/products` — Returns a full list of all products.
-   `GET /api/products/:id` — Returns a single product by its ID.
-   `GET /api/products/categories` — Returns an array of available product category strings.
-   `GET /api/products/colors` — Returns an array of available color hex strings.
-   `GET /api/products/relevant` — Returns a list of products marked as "relevant" for the main page.

---

## 🧰 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run test`    | Run unit tests           |

---

## 🧭 Routing


Routing is handled via **React Router v6**, utilizing the modern data router features (e.g., `createBrowserRouter`). 
All routes are defined centrally in `/src/app/app.tsx`.

A key feature of the routing setup is the dynamic generation of breadcrumbs. 
This is achieved by adding a `handle` object to each route definition. The `Breadcrumbs` component then uses the 
`useMatches()` hook to read these handles and render the navigation path.


---

## 📋 Features

- [x] Responsive layout
- [x] Header and Footer menus
- [x] Integrate real API endpoints
- [x] Connect global error handling
- [x] Configure CI/CD pipeline
- [ ] Main page
  - [x] Top Ad block
  - [x] Relevant products block
  - [ ] Inspiration block with slider
  - [ ] Gallery block
- [ ] Shop page
  - [x] Page header
  - [x] Product list
  - [x] Frontend pagination
  - [x] Filter and filtration
  - [x] Sorting
  - [ ] Bottom Ad block
- [ ] Product detail page
- [ ] Cart and Cart total page
- [ ] Checkout
- [ ] Contact

---

## 🧑‍💻 Author

Developed by Natalia Konovalova  
📫 Telegram: [@p0kute](https://t.me/p0kute)  
💼 LinkedIn: [Natalia Konovalova](https://linkedin.com/in/yourprofile)

---

### 🪄 License

MIT © 2025 — Free to use and modify.
