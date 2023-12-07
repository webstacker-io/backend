import { UserInputError } from 'apollo-server-express';
import {
  getSprintById,
  getAllSprintsByProjectById,
  createSprint,
  updateSprint,
  deleteSprint,
} from '../drivers/sprints';

const sprints: { [key: string]: any }[] = require('../data/sprintsData'); // Sample in-memory data

const sprintResolvers = {
  Query: {
    getSprint: async (_: any, { sprint_id }: any) => {
      try {
        // Implement logic to fetch a sprint by ID from Cassandra using your driver
        const sprint = await getSprintById(sprint_id);
        if (!sprint) {
          throw new UserInputError('Sprint not found', { sprint_id });
        }
        return sprint;
      } catch (error) {
        throw new UserInputError('Unable to fetch sprint', { error });
      }
    },
    getAllSprints: async (_: any, { project_id }: any) => {
      try {
        // Implement logic to fetch all sprints from Cassandra using your driver
        const sprints = await getAllSprintsByProjectById(project_id);
        return sprints;
      } catch (error) {
        throw new UserInputError('Unable to fetch sprints', { error });
      }
    },
  },
  Mutation: {
    createSprint: async (_: any, { sprint }: any) => {
      try {
        // Implement logic to create a new sprint in Cassandra using your driver
        const newSprint = await createSprint(sprint);
        return newSprint;
      } catch (error) {
        throw new UserInputError('Unable to create sprint', { error });
      }
    },
    updateSprint: async (_: any, { sprint_id, sprint }: any) => {
      try {
        // Implement logic to update a sprint in Cassandra using your driver
        const updatedSprint = await updateSprint(sprint_id, sprint);
        return updatedSprint;
       
      } catch (error) {
        throw new UserInputError('Unable to update sprint', { error });
      }
    },
    deleteSprint: async (_: any, { sprint_id }: any) => {
      try {
        // Implement logic to delete a sprint from Cassandra using your driver
       
        const selectedSprint = await getSprintById(sprint_id);
        if (!selectedSprint) {
          throw new UserInputError('Project not found', { sprint_id });
        }
        await deleteSprint(sprint_id);
        return selectedSprint;
      } catch (error) {
        throw new UserInputError('Unable to delete sprint', { error });
      }
    },
  },
};

export default sprintResolvers;
