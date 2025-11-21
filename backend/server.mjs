import jsonServer from "json-server";
import { createDb } from "./db.mjs";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Основные middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// // Подключаем кастомные роуты (необязательно)
// server.get("/health", (_, res) => {
// 	res.json({ status: "ok" });
// });

// Асинхронное подключение базы
async function start() {
	const db = await createDb();
	const router = jsonServer.router(db);

	// Можно настроить свои правила URL
	// server.use('/api', router);  // если хочешь вынести под /api

	server.use(router);

	const port = process.env.PORT || 3001;
	server.listen(port, () => {
		console.log(`🚀 JSON Server is running at http://localhost:${port}`);
	});
}

start();
