import db from "#db/client";
import { createUser } from "./queries/users.js";
import { createProduct } from "./queries/products.js";
import { createOrder } from "./queries/orders.js";
import { addProductToOrder } from "./queries/orders_products.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // 1 user only. //
  const user = await createUser("Jo Darko", "password123");

  // created 10 distint products //
  const products = [];
  for (let i = 1; i <= 10; i++) {
    const product = await createProduct(
      `Product ${i}`,
      `Description for Product ${i}`,
      i * 10.0
    );
    products.push(product);
  }
  //order for Jo Darko//

  const order = await createOrder(
    "2025-02-02",
    "First order with 5 items",
    user.id
  );

  // 5 products for the user //
  for (let i = 0; i < 5; i++) {
    await addProductToOrder(order.id, products[i].id, 1);
  }
}
