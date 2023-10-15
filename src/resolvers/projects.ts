import { UserInputError } from 'apollo-server-express';
import { YourCassandraDriver } from '../../data/your-cassandra-driver';

const projectResolvers = {
  Query: {
    getProject: async (_: any, { project_id }: any) => {
      try {
        // Implement logic to fetch a project by ID from Cassandra using your driver
        const project = await YourCassandraDriver.getProjectById(project_id);
        if (!project) {
          throw new UserInputError('Project not found', { project_id });
        }
        return project;
      } catch (error) {
        throw new UserInputError('Unable to fetch project', { error });
      }
    },
    getAllProjects: async () => {
      try {
        // Implement logic to fetch all projects from Cassandra using your driver
        const projects = await YourCassandraDriver.getAllProjects();
        return projects;
      } catch (error) {
        throw new UserInputError('Unable to fetch projects', { error });
      }
    },
  },
  Mutation: {
    createProject: async (_: any, { project }: any) => {
      try {
        // Implement logic to create a new project in Cassandra using your driver
        const newProject = await YourCassandraDriver.createProject(project);
        return newProject;
      } catch (error) {
        throw new UserInputError('Unable to create project', { error });
      }
    },
    updateProject: async (_: any, { project_id, project }: any) => {
      try {
        // Implement logic to update a project in Cassandra using your driver
        const updatedProject = await YourCassandraDriver.updateProject(project_id, project);
        return updatedProject;
      } catch (error) {
        throw new UserInputError('Unable to update project', { error });
      }
    },
    deleteProject: async (_: any, { project_id }: any) => {
      try {
        // Implement logic to delete a project from Cassandra using your driver
        const index = projects.findIndex((p) => p.project_id === project_id);
        if (index === -1) {
          throw new UserInputError('Project not found', { project_id });
        }
        const deletedProject = projects.splice(index, 1)[0];
        return deletedProject;
      } catch (error) {
        throw new UserInputError('Unable to delete project', { error });
      }
    },
  },
};

export default projectResolvers;
