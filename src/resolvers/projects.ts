import { UserInputError } from 'apollo-server-express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../drivers/projects'

const projectResolvers = {
  Query: {
    getProject: async (_: any, { project_id }: any) => {
      try {
        // Implement logic to fetch a project by ID from Cassandra using your driver
        const project = await getProjectById(project_id);
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
        const projects = await getAllProjects();
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
        const newProject = await createProject(project);
        return newProject;
      } catch (error) {
        throw new UserInputError('Unable to create project', { error });
      }
    },
    updateProject: async (_: any, { project_id, project }: any) => {
      try {
        // Implement logic to update a project in Cassandra using your driver
        const updatedProject = await updateProject(project_id, project);
        return updatedProject;
      } catch (error) {
        throw new UserInputError('Unable to update project', { error });
      }
    },
    deleteProject: async (_: any, { project_id }: any) => {
      try {
        // Implement logic to delete a project from Cassandra using your driver
        const selectedProject = await getProjectById(project_id);
        if (!selectedProject) {
          throw new UserInputError('Project not found', { project_id });
        }
        await deleteProject(project_id);
        return selectedProject;
      } catch (error) {
        throw new UserInputError('Unable to delete project', { error });
      }
    },
  },
};

export default projectResolvers;
