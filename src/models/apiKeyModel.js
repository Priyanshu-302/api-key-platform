const { pool } = require("../config/postgres_db");

// Create a new API key in DB
exports.createApiKey = async (user_id, key_name, raw_key, key_hash) => {
  await pool.query(
    `INSERT INTO api_keys(user_id, key_name, raw_key, key_hash, daily_limit, is_active)
     VALUES ($1, $2, $3, $4, 100, true)`,
    [user_id, key_name, raw_key, key_hash]
  );
};

// Get API key by raw key (for validation)
exports.getApiKeyByRawKey = async (rawKey) => {
  const result = await pool.query(
    `SELECT id, user_id, key_name, key_hash, daily_limit, is_active
     FROM api_keys
     WHERE raw_key = $1 AND is_active = true`,
    [rawKey]
  );

  return result.rows[0]; // undefined if not found
};

// Get all API keys of a user
exports.getApiKeysByUserId = async (user_id) => {
  const result = await pool.query(
    `SELECT id, key_name, is_active, created_at
     FROM api_keys
     WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

// Soft delete
exports.revokeApiKeyByUserId = async (id, user_id) => {
  await pool.query(
    `UPDATE api_keys SET is_active = false WHERE id = $1 AND user_id = $2`,
    [id, user_id]
  );
};
