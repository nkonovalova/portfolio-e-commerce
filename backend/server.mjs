import jsonServer from "json-server";
import fs from "fs";
import path from "path";
import { createDb } from "./db.mjs";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const routes = JSON.parse(fs.readFileSync(path.resolve("routes.json")));
server.use(jsonServer.rewriter(routes));

server.use(middlewares);
server.use(jsonServer.bodyParser);

async function start() {
  const db = await createDb();
  const router = jsonServer.router(db);

  server.get("/products/colors", (req, res) => {
    res.jsonp(router.db.get("colors").value());
  });

  server.get("/products/categories", (req, res) => {
    res.jsonp(router.db.get("productCategories").value());
  });

  server.get("/products/relevant", (req, res) => {
    res.jsonp(router.db.get("relevantProducts").value());
  });

  server.use(router);

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`🚀 JSON Server is running at http://localhost:${port}\n`);
    console.log("----------------------------------------------------");

    console.log("✨ Standard Endpoints (available via /api/ prefix):");
    Object.keys(db).forEach((key) => {
      if (key === "colors" || key === "productCategories") return;
      console.log(`   /api/${key}`);
    });

    console.log("\n✨ Custom Mapped Endpoints:");
    console.log("   /api/products/colors -> /colors");
    console.log("   /api/products/categories -> /productCategories");
    console.log("   /api/products/relevant -> /relevantProducts");

    console.log("----------------------------------------------------");
  });
}

start();
