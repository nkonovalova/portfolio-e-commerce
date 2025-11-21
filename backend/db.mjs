// import fs from "fs";
//
// const dir = __dirname;
// const data = {
// 	products: JSON.parse(fs.readFileSync(dir + "/data/products.json", "utf8")),
// 	relevantProducts: JSON.parse(
// 		fs.readFileSync(dir + "/data/products.json", "utf8"),
// 	),
// };
//
// export default data;

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// путь к корню проекта
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createDb() {
	const dataDir = path.join(__dirname, "data");
	const files = await fs.readdir(dataDir);

	const db = {};

	for (const file of files) {
		if (!file.endsWith(".json")) continue;

		const name = file.replace(".json", "");
		const filePath = path.join(dataDir, file);
		// @ts-ignore
		db[name] = JSON.parse(await fs.readFile(filePath, "utf8"));
	}

	return db;
}
