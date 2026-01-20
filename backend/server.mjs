import express from "express";
import path from "path";
import cors from "cors";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// const __dirname = new URL(".", import.meta.url).pathname;
// const dataPath = path.join(__dirname, "data");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "data");

const readJsonFile = async (filename) => {
  const file = await readFile(path.join(dataPath, filename), "utf-8");
  return JSON.parse(file);
};

app.get("/api/products", async (req, res) => {
  try {
    const products = await readJsonFile("products.json");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error reading products data" });
  }
});

app.get("/api/products/categories", async (req, res) => {
  try {
    const categories = await readJsonFile("productCategories.json");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error reading categories data" });
  }
});

// Endpoint for colors
app.get("/api/products/colors", async (req, res) => {
  try {
    const colors = await readJsonFile("colors.json");
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: "Error reading colors data" });
  }
});

// Endpoint for relevant products
app.get("/api/products/relevant", async (req, res) => {
  try {
    const relevantProducts = await readJsonFile("relevantProducts.json");
    res.json(relevantProducts);
  } catch (error) {
    res.status(500).json({ message: "Error reading relevant products data" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await readJsonFile("products.json");
    const product = products.find((p) => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading products data" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
