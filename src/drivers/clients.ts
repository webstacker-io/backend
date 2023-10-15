import {cassandraClient} from "../client";
import { types } from 'cassandra-driver';

const { Uuid } = types;

// Initialize the client
cassandraClient.connect()
  .then(() => console.log('Cassandra connected'))
  .catch((err) => console.error('Error connecting to Cassandra:', err));

export async function getClientById(client_id: string) {
  const query = 'SELECT * FROM clients WHERE client_id = ?';
  const params = [Uuid.fromString(client_id)];

  try {
    const result = await cassandraClient.execute(query, params, { prepare: true });
    return result.first();
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
}

export async function getAllClients() {
  const query = 'SELECT * FROM clients';

  try {
    const result = await cassandraClient.execute(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all clients:', error);
    throw error;
  }
}

export async function createClient(client_name: string, email: string) {
  const client_id = Uuid.random();
  const query = 'INSERT INTO clients (client_id, client_name, email) VALUES (?, ?, ?)';
  const params = [client_id, client_name, email];

  try {
    await cassandraClient.execute(query, params, { prepare: true });
    return { client_id, client_name, email };
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}

export async function updateClient(client_id: string, client_name: string, email: string) {
  const query = 'UPDATE clients SET client_name = ?, email = ? WHERE client_id = ?';
  const params = [client_name, email, Uuid.fromString(client_id)];

  try {
    await cassandraClient.execute(query, params, { prepare: true });
    return { client_id, client_name, email };
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

export async function deleteClient(client_id: string) {
  const query = 'DELETE FROM clients WHERE client_id = ?';
  const params = [Uuid.fromString(client_id)];

  try {
    const result = await cassandraClient.execute(query, params, { prepare: true });
    if (result.rowLength > 0) {
      return { client_id };
    } else {
      throw new Error('Client not found');
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
}