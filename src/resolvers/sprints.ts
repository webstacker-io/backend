import { UserInputError } from 'apollo-server-express';
import { YourCassandraDriver } from '../../data/your-cassandra-driver';

const sprints: { [key: string]: any }[] = require('../data/sprintsData'); // Sample in-memory data

const sprintResolvers = {
  Query: {
    getSprint: async (_, { sprint_id }) => {
      try {
        // Implement logic to fetch a sprint by ID from Cassandra using your driver
        const sprint = sprints.find((s) => s.sprint_id === sprint_id);
        if (!sprint) {
          throw new UserInputError('Sprint not found', { sprint_id });
        }
        return sprint;
      } catch (error) {
        throw new UserInputError('Unable to fetch sprint', { error });
      }
    },
    getAllSprints: async () => {
      try {
        // Implement logic to fetch all sprints from Cassandra using your driver
        return sprints;
      } catch (error) {
        throw a UserInputError('Unable to fetch sprints', { error });
      }
    },
  },
  Mutation: {
    createSprint: async (_, { sprint }) => {
      try {
        // Implement logic to create a new sprint in Cassandra using your driver
        sprint.sprint_id = String(Math.max(...sprints.map((s) => Number(s.sprint_id))) + 1);
        sprints.push(sprint);
        return sprint;
      } catch (error) {
        throw new UserInputError('Unable to create sprint', { error });
      }
    },
    updateSprint: async (_, { sprint_id, sprint }) => {
      try {
        // Implement logic to update a sprint in Cassandra using your driver
        const index = sprints.findIndex((s) => s.sprint_id === sprint_id);
        if (index === -1) {
          throw new UserInputError('Sprint not found', { sprint_id });
        }
        sprints[index] = { ...sprints[index], ...sprint };
        return sprints[index];
      } catch (error) {
        throw new UserInputError('Unable to update sprint', { error });
      }
    },
    deleteSprint: async (_, { sprint_id }) => {
      try {
        // Implement logic to delete a sprint from Cassandra using your driver
        const index = sprints.findIndex((s) => s.sprint_id === sprint_id);
        if (index === -1) {
          throw new UserInputError('Sprint not found', { sprint_id });
        }
        const deletedSprint = sprints.splice(index, 1)[0];
        return deletedSprint;
      } catch (error) {
        throw new UserInputError('Unable to delete sprint', { error });
      }
    },
  },
};

export default sprintResolvers;
