import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const client = new Client({
  connectionString: process.env.DB_URL as string,
});
const main = async () => {
  await client.connect();
};
main();
const db = drizzle(client, { schema });

export default db;
