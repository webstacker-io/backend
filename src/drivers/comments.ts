import {cassandraClient} from "../client";

cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch((err: any) => console.error(`Cassandra connection error: ${err}`));

// Function to fetch all comments for a task
export async function getAllComments() {
  const query = 'SELECT * FROM comments';
  try {
    const result = await cassandraClient.execute(query, [], { prepare: true });
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single comment by comment_id
export async function getCommentById(commentId: any) {
  const query = 'SELECT * FROM comments WHERE comment_id = ?';
  try {
    const result = await cassandraClient.execute(query, [commentId], { prepare: true });
    return result.first();
  } catch (error) {
    throw error;
  }
}

// Function to create a new comment
export async function createComment(comment: { comment_id: any; task_id: any; user_id: any; comment_text: any; created_at: any; }) {
  const query = 'INSERT INTO comments (comment_id, task_id, user_id, comment_text, created_at) VALUES (?, ?, ?, ?, ?)';
  try {
    await cassandraClient.execute(query, [comment.comment_id, comment.task_id, comment.user_id, comment.comment_text, comment.created_at], { prepare: true });
    return comment;
  } catch (error) {
    throw error;
  }
}

// Function to update an existing comment
export async function updateComment(commentId: any, updatedComment: { comment_text: any; created_at: any; }) {
  const query = 'UPDATE comments SET comment_text = ?, created_at = ? WHERE comment_id = ?';
  try {
    await cassandraClient.execute(query, [updatedComment.comment_text, updatedComment.created_at, commentId], { prepare: true });
    return updatedComment;
  } catch (error) {
    throw error;
  }
}

// Function to delete a comment by comment_id
export async function deleteComment(commentId: any) {
  const query = 'DELETE FROM comments WHERE comment_id = ?';
  try {
    await cassandraClient.execute(query, [commentId], { prepare: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
