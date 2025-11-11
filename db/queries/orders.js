import db from "../client.js";

export async function createOrder(date, note, userId) {
  const {
    rows: [order],
  } = await db.query(
    `INSERT INTO orders (date, note, user_id)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [date, note ?? null, userId]
  );
  return order;
}

export async function getOrderById(id) {
  const {
    rows: [order],
  } = await db.query(`SELECT * FROM orders WHERE id = $1;`, [id]);
  return order ?? null;
}

export async function getOrdersByUserId(userId) {
  const { rows } = await db.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY id;`,
    [userId]
  );
  return rows;
}
