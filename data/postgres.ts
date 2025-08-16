import postgres from 'postgres';
import config from '../env.json';

// Validate that all required configuration keys are present in env.json
const requiredConfig = ['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
for (const key of requiredConfig) {
    if (!config[key as keyof typeof config]) {
        // Throw a clear error if a configuration value is missing.
        throw new Error(`Missing required configuration in env.json: ${key}`);
    }
}

// Construct the connection URL from your configuration file.
// The format is: postgres://USER:PASSWORD@HOST:PORT/DATABASE
const connectionUrl = `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

// Create a single, shared instance of the postgres client.
// The library will manage a connection pool for you automatically.
const sql: postgres.Sql<{}> = postgres(connectionUrl, {
    onnotice: console.log, // Log notices from Postgres
    // This transform can automatically convert snake_case columns to camelCase in results
    // transform: {
    //   column: postgres.camel,
    // },
});

// It's good practice to have a function to verify the connection on app startup.
async function testDbConnection() {
    try {
        await sql`SELECT 1`; // postgres.js connects lazily, so a query is needed to test.
        console.log('✅ Successfully connected to PostgreSQL.');
    } catch (error) {
        console.error('❌ Failed to connect to PostgreSQL:', error);
        throw error; // Re-throw to stop the app if the DB is down.
    }
}

// Export the singleton instance for use in other modules.
export {sql, testDbConnection};