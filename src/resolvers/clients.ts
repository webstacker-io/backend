import { ApolloError, UserInputError } from 'apollo-server-express';
import * as clientdriver from '../drivers/clients'

const clientsResolvers = {
  Query: {
    getClient: async (_: any, { client_id }: any) => {
      try {
        // Implement logic to fetch a client by ID from Cassandra using your driver
        const client = await clientdriver.getClientById(client_id);
        if (client) {
          return client;
        } else {
          throw new UserInputError('Client not found', { client_id });
        }
      } catch (error) {
        throw new ApolloError('Unable to fetch client', 'DATABASE_ERROR');
      }
    },
    getAllClients: async () => {
      try {
        // Implement logic to fetch all clients from Cassandra using your driver
        const clients = await clientdriver.getAllClients();
        return clients;
      } catch (error) {
        throw new ApolloError('Unable to fetch clients', 'DATABASE_ERROR');
      }
    },
  },
  Mutation: {
    createClient: async (_: any, { client }: any) => {
      try {
        // Implement logic to create a new client in Cassandra using your driver
        const newClient = await clientdriver.createClient(client.name, client.email );
        return newClient;
      } catch (error) {
        throw new ApolloError('Unable to create client', 'DATABASE_ERROR');
      }
    },
    updateClient: async (_: any, { client_id, client }: any) => {
      try {
        // Implement logic to update a client in Cassandra using your driver
        const updatedClient = await clientdriver.updateClient(client_id,client.name, client.email);
        if (updatedClient) {
          return updatedClient;
        } else {
          throw new UserInputError('Client not found', { client_id });
        }
      } catch (error) {
        throw new ApolloError('Unable to update client', 'DATABASE_ERROR');
      }
    },
    deleteClient: async (_: any, { client_id }: any) => {
      try {
        // Implement logic to delete a client from Cassandra using your driver
        const deletedClient = await clientdriver.deleteClient(client_id);
        if (deletedClient) {
          return deletedClient;
        } else {
          throw new UserInputError('Client not found', { client_id });
        }
      } catch (error) {
        throw new ApolloError('Unable to delete client', 'DATABASE_ERROR');
      }
    },
  },
};

export default clientsResolvers;
