const pool = require("../config/postgres_db");

// Create the API key
exports.createApiKey = async (id, user_id, key_name, key_hash) => {
  await pool.query(
    `insert into api_keys(id, user_id, key_name, key_hash, daily_limit, is_active) values($1, $2, $3, $4, 100, true)`,
    [id, user_id, key_name, key_hash],
  );
};

// Get all the API keys related to a user
exports.getApiKeysByUserId = async (user_id) => {
  const result = await pool.query(
    `select id, key_name, is_active, created_at from api_keys where user_id = $1`,
    [user_id],
  );

  return result.rows;
};

// Soft delete the API key
exports.revokeApiKeyByUserId = async (id, user_id) => {
  await pool.query(
    `update api_keys set is_active = false where id = $1 and user_id = $2`,
    [id, user_id],
  );
};

// Get all the API keys
exports.getAllApiKeys = async () => {
  const result = await pool.query(`select id, key_name from api_keys where is_active = true`);

  return result.rows;
};