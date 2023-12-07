import {cassandraClient} from "../client";

cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch((err) => console.error(`Cassandra connection error: ${err}`));


// Function to fetch all users
export async function getAllUsers() {
  const query = 'SELECT * FROM users';
  try {
    const result = await cassandraClient.execute(query, [], { prepare: true });
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single user by user_id
export async function getUser(userId: any) {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  try {
    const result = await cassandraClient.execute(query, [userId], { prepare: true });
    return result.first();
  } catch (error) {
    throw error;
  }
}

// Function to create a new user
export async function createUser(user: { user_id: any; user_name: any; email: any; password: any; }) {
  const query = 'INSERT INTO users (user_id, user_name, email, password) VALUES (?, ?, ?, ?)';
  try {
    await cassandraClient.execute(query, [user.user_id, user.user_name, user.email, user.password], { prepare: true });
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to update an existing user
export async function updateUser(userId: any, updatedUser: { user_name: any; email: any; password: any; }) {
  const query = 'UPDATE users SET user_name = ?, email = ?, password = ? WHERE user_id = ?';
  try {
    await cassandraClient.execute(query, [updatedUser.user_name, updatedUser.email, updatedUser.password, userId], { prepare: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Function to delete a user by user_id
export async function deleteUser(userId: any) {
  const query = 'DELETE FROM users WHERE user_id = ?';
  try {
    await cassandraClient.execute(query, [userId], { prepare: true });
  } catch (error) {
    throw error;
  }
}
