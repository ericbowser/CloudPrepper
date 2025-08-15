import {Client} from 'pg';

const connectionString = 'postgres://postgres@localhost';

async function connectLocalPostgres() {
  let client = null;
  try {
    client = new Client({
      connectionString,
      ssl: false
    });

    await client.connect();
    return client;
  } catch (e) {
    console.log(e);
  }

  return client;
}

export default connectLocalPostgres;