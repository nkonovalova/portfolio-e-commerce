# 🛍️ Product Catalog Frontend

A modern web application for displaying and managing a product catalog.  
Built with **React**, **Redux Toolkit**, and **Vite**, it provides a fast and scalable architecture for e-commerce or showcase projects.

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

API documentation is described in [`API.yaml`](./API.yaml).  
Example endpoints:

- `GET /products` — returns full product list
- `GET /relatedProducts` — returns related products for the main page

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

Routing is handled via **React Router v6**.  
All routes are defined in `/src/app/router.tsx` (or `/routes/` folder).

Example:

```tsx
<Routes>
	<Route path="/" element={<HomePage />} />
	<Route path="/product/:id" element={<ProductPage />} />
</Routes>
```

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
  - [ ] Page header
  - [ ] Product list
  - [ ] Frontend pagination
  - [ ] Filter and filtration
  - [ ] Sorting
  - [ ] Bottom Ad block
- [ ] Product detail page
- [ ] Cart and Cart total page
- [ ] Checkout
- [ ] Contact

---

## 🧑‍💻 Author

Developed by Natalia Konovalova  
📫 Telegram: [@p0kute](https://t.me/p0kute)  
💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

### 🪄 License

MIT © 2025 — Free to use and modify.
