import {cassandraClient} from "../client";


cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch((err) => console.error(`Cassandra connection error: ${err}`));
  
// Function to fetch all projects
export async function getAllProjects() {
  const query = 'SELECT * FROM projects';
  try {
    const result = await cassandraClient.execute(query, [], { prepare: true });
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single project by project_id
export async function getProjectById(projectId: any) {
  const query = 'SELECT * FROM projects WHERE project_id = ?';
  try {
    const result = await cassandraClient.execute(query, [projectId], { prepare: true });
    return result.first();
  } catch (error) {
    throw error;
  }
}

// Function to create a new project
export async function createProject(project: { project_id: any; project_name: any; cassandraClient_id: any; }) {
  const query = 'INSERT INTO projects (project_id, project_name, cassandraClient_id) VALUES (?, ?, ?)';
  try {
    await cassandraClient.execute(query, [project.project_id, project.project_name, project.cassandraClient_id], { prepare: true });
    return project;
  } catch (error) {
    throw error;
  }
}

// Function to update an existing project
export async function updateProject(projectId: any, updatedProject: { project_name: any; cassandraClient_id: any; }) {
  const query = 'UPDATE projects SET project_name = ?, cassandraClient_id = ? WHERE project_id = ?';
  try {
    await cassandraClient.execute(query, [updatedProject.project_name, updatedProject.cassandraClient_id, projectId], { prepare: true });
    return updatedProject;
  } catch (error) {
    throw error;
  }
}

// Function to delete a project by project_id
export async function deleteProject(projectId: any) {
  const query = 'DELETE FROM projects WHERE project_id = ?';
  try {
    await cassandraClient.execute(query, [projectId], { prepare: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
