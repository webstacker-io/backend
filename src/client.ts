import { Client } from 'cassandra-driver';

// Create a Cassandra client and connect to your Cassandra cluster
export const cassandraClient = new Client({
  contactPoints: ['localhost'], // Cassandra node(s) address
  localDataCenter: 'datacenter1', // The name of the local data center
  keyspace: 'collab', // The name of your Cassandra keyspace
});
