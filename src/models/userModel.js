const pool = require("../config/postgres_db");

exports.createUser = async (id, email, password) => {
  await pool.query(
    `insert into users(id, email, passowrd) values($1, $2, $3)`,
    [id, email, password],
  );
};

exports.findUserByEmail = async (email) => {
  const result = await pool.query(`select id, email from users where email = $1`, [
    email,
  ]);

  return result.rows[0];
};

exports.findUserById = async (id) => {
  const result = await pool.query(`select id, email from users where id = $1`, [id]);

  return result.rows[0];
};
