import db from "../client.js";

export async function addProductToOrder(orderId, productId, quantity) {
  const {
    rows: [row],
  } = await db.query(
    `INSERT INTO orders_products (order_id, product_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [orderId, productId, quantity]
  );
  return row;
}
