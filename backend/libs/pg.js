const pg = require("pg");

const pgPool = new pg.Pool({
  connectionString:
    "postgres://postgres.gikkotgawhdcigtepkwf:q3o7BpafOHQpoESf@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
});

pgPool.connect();
pgPool.on("error", async () => {
  await pgPool.connect();
});

module.exports = pgPool;
