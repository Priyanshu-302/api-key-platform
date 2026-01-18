// This will be the replica of rate limiter in Redis
const pool = require("../config/postgres_db");

// Get the API usage
exports.getApiUsage = async (id, date) => {
  const result = await pool.query(
    `select * from api_key_usage where api_key_id = $1 and usage_date = $2`,
    [id, date],
  );

  return result.rows[0];
};

// Increments the API usage and uses the concept of upsert(ON CONFLICT) to get rid of errors
exports.incrementApiUsage = async (id, date) => {
  await pool.query(
    `insert into api_key_usage(api_key_id, usage_date, request_count) values($1, $2, 1) on conflict(api_key_id, usage_date) do update set request_count = api_key_usage.request_count + 1`,
    [id, date],
  );
};
