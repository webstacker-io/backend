import { UserInputError } from 'apollo-server-express';

// Import your Cassandra driver and implement database interactions
import  {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../drivers/tasks';

const taskResolvers = {
  Query: {
    getTask: async (_: any, { task_id, project_id, Sprint_id }: any) => {
      try {
        // Implement logic to fetch a task by ID from Cassandra using your driver
        const task = await getTask(task_id, project_id, Sprint_id);
        if (!task) {
          throw new UserInputError('Task not found', { task_id });
        }
        return task;
      } catch (error) {
        throw new UserInputError('Unable to fetch task', { error });
      }
    },
    getAllTasks: async ({ project_id, Sprint_id }: any) => {
      try {
        // Implement logic to fetch all tasks from Cassandra using your driver
        const task = await getAllTasks(project_id, Sprint_id);
        return task;
      } catch (error) {
        throw new UserInputError('Unable to fetch tasks', { error });
      }
    },
  },
  Mutation: {
    createTask: async (_: any, { task, project_id, sprint_id }: any) => {
      try {
        // Implement logic to create a new task in Cassandra using your driver
        const newTask = await createTask({...task});
        return newTask;
      } catch (error) {
        throw new UserInputError('Unable to create task', { error });
      }
    },
    updateTask: async (_: any, { task_id, task }: any) => {
      try {
        // Implement logic to update a task in Cassandra using your driver
        const updateTasks = await updateTask(task_id,{...task});
        return updateTasks;
      } catch (error) {
        throw new UserInputError('Unable to update task', { error });
      }
    },
    deleteTask: async (_: any, { task_id }: any) => {
      try {
        // Implement logic to delete a task from Cassandra using your driver
       
        const deletedTask = deleteTask(task_id);
        return deletedTask;
      } catch (error) {
        throw new UserInputError('Unable to delete task', { error });
      }
    },
  },
};

export default taskResolvers;
