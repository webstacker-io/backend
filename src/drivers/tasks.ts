import {cassandraClient} from "../client";

// Function to fetch all tasks for a project
export async function getAllTasks(projectId: any, Sprint_id: any) {
  const query = 'SELECT * FROM tasks WHERE project_id = ? and sprint_id = ?';
  try {
    const result = await cassandraClient.execute(query, [projectId, Sprint_id], { prepare: true });
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single task by task_id
export async function getTask(taskId: any,project_id: any, Sprint_id: any) {
  const query = 'SELECT * FROM tasks WHERE task_id = ? and project_id = ? and sprint_id = ?';
  try {
    const result = await cassandraClient.execute(query, [taskId,project_id, Sprint_id], { prepare: true });
    return result.first();
  } catch (error) {
    throw error;
  }
}

// Function to create a new task
export async function createTask(task: { task_id: any; task_name: any; project_id: any; sprint_id: any; user_id: any; status: any; created_at: any; due_date: any; }) {
  const query = 'INSERT INTO tasks (task_id, task_name, project_id, sprint_id, user_id, status, created_at, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  try {
    await cassandraClient.execute(query, [task.task_id, task.task_name, task.project_id, task.sprint_id, task.user_id, task.status, task.created_at, task.due_date], { prepare: true });
    return task;
  } catch (error) {
    throw error;
  }
}

// Function to update an existing task
export async function updateTask(taskId: any, updatedTask: { task_name: any; project_id: any; sprint_id: any; user_id: any; status: any; created_at: any; due_date: any; }) {
  const query = 'UPDATE tasks SET task_name = ?, project_id = ?, sprint_id = ?, user_id = ?, status = ?, created_at = ?, due_date = ? WHERE task_id = ?';
  try {
    await cassandraClient.execute(query, [
      updatedTask.task_name,
      updatedTask.project_id,
      updatedTask.sprint_id,
      updatedTask.user_id,
      updatedTask.status,
      updatedTask.created_at,
      updatedTask.due_date,
      taskId,
    ], { prepare: true });
    return updatedTask;
  } catch (error) {
    throw error;
  }
}

// Function to delete a task by task_id
export async function deleteTask(taskId: any) {
  const query = 'DELETE FROM tasks WHERE task_id = ?';
  try {
    await cassandraClient.execute(query, [taskId], { prepare: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
