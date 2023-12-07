import {cassandraClient} from "../client";

cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch((err) => console.error(`Cassandra connection error: ${err}`));

// Function to fetch all sprints for a project
export async function getSprintById(projectId: any) {
  const query = 'SELECT * FROM sprints WHERE project_id = ?';
  try {
    const result = await cassandraClient.execute(query, [projectId], { prepare: true });
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single sprint by sprint_id
export async function getAllSprintsByProjectById(project_id: any) {
  const query = 'SELECT * FROM sprints WHERE project_id = ?';
  try {
    const result = await cassandraClient.execute(query, [project_id], { prepare: true });
    return result.first();
  } catch (error) {
    throw error;
  }
}

// Function to create a new sprint
export async function createSprint(sprint: { sprint_id: any; sprint_name: any; project_id: any; start_date: any; end_date: any; }) {
  const query = 'INSERT INTO sprints (sprint_id, sprint_name, project_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
  try {
    await cassandraClient.execute(query, [sprint.sprint_id, sprint.sprint_name, sprint.project_id, sprint.start_date, sprint.end_date], { prepare: true });
    return sprint;
  } catch (error) {
    throw error;
  }
}

// Function to update an existing sprint
export async function updateSprint(sprintId: any, updatedSprint: { sprint_name: any; start_date: any; end_date: any; }) {
  const query = 'UPDATE sprints SET sprint_name = ?, start_date = ?, end_date = ? WHERE sprint_id = ?';
  try {
    await cassandraClient.execute(query, [updatedSprint.sprint_name, updatedSprint.start_date, updatedSprint.end_date, sprintId], { prepare: true });
    return updatedSprint;
  } catch (error) {
    throw error;
  }
}

// Function to delete a sprint by sprint_id
export async function deleteSprint(sprintId: any) {
  const query = 'DELETE FROM sprints WHERE sprint_id = ?';
  try {
    await cassandraClient.execute(query, [sprintId], { prepare: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getSprintById,
  getAllSprintsByProjectById,
  createSprint,
  updateSprint,
  deleteSprint,
};
