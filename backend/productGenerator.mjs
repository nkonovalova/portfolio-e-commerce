import { faker } from '@faker-js/faker';
import fs from "fs";
const __dirname = import.meta.dirname;

const productSizes = ['XS', 'S', 'M', 'L', 'XL'];
const furnitureCategories = [
	"Living Room",
	"Bedroom",
	"Dining & Kitchen",
	"Office",
	"Outdoor",
	"Entryway",
	"Kids & Nursery",
	"Lighting",
	"Rugs",
	"Decor",
];

const getProduct = () => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	image: faker.image.url(),
	description: {
		caption: faker.commerce.productAdjective(),
		small: faker.commerce.productAdjective(),
		full: faker.commerce.productDescription(),
	},
	price: faker.commerce.price({ min: 1000, max: 200000, dec: 2 }),
	currency: 'USD',
	status: {
		new: faker.datatype.boolean(),
		discount: faker.number.int({ min: 0, max: 90}),
		last: faker.datatype.boolean(),
		hot: faker.datatype.boolean(),
	},
	category: faker.helpers.arrayElements(furnitureCategories),
	size: faker.helpers.arrayElements(productSizes),
	color: faker.color.rgb(),
	rating: faker.number.int({ min: 1, max: 5 }),
});

const productsArr = new Array(50).fill({}).map(() => getProduct());
const relevantProducts = productsArr.slice(0, 8);

try {
	fs.writeFileSync(
		__dirname + "/data/products.json",
		JSON.stringify(productsArr),
	);
	fs.writeFileSync(
		__dirname + "/data/relevantProducts.json",
		JSON.stringify(relevantProducts)
	)
	// file written successfully
} catch (err) {
	console.error(err);
}


