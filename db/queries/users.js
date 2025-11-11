import db from "../client.js";

export async function createUser(username, password) {
  const {
    rows: [user],
  } = await db.query(
    `INSERT INTO users (username, password)
     VALUES ($1, $2)
     RETURNING id, username;`,
    [username, password]
  );
  return user;
}

export async function getUserByUsernameWithPassword(username) {
  const {
    rows: [user],
  } = await db.query(`SELECT * FROM users WHERE username = $1;`, [username]);
  return user ?? null;
}
