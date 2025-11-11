import db from "../client.js";

export async function createProduct(title, description, price) {
  const {
    rows: [product],
  } = await db.query(
    `INSERT INTO products (title, description, price)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [title, description, price]
  );
  return product;
}

export async function getAllProducts() {
  const { rows } = await db.query(`SELECT * FROM products ORDER BY id;`);
  return rows;
}

export async function getProductById(id) {
  const {
    rows: [product],
  } = await db.query(`SELECT * FROM products WHERE id = $1;`, [id]);
  return product ?? null;
}
