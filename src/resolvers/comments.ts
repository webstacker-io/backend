import { UserInputError } from 'apollo-server-express';
import {getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,} from  '../drivers/comments';

const commentsResolvers = {
  Query: {
    getComment: async (_: any, { comment_id }: any) => {
      try {
        // Implement logic to fetch a comment by ID from Cassandra using your driver
        const comment = await getCommentById(comment_id);
        if (!comment) {
          throw new UserInputError('Comment not found', { comment_id });
        }
        return comment;
      } catch (error) {
        throw new UserInputError('Unable to fetch comment', { error });
      }
    },
    getAllComments: async () => {
      try {
        // Implement logic to fetch all comments from Cassandra using your driver
        const comments = await getAllComments();
        return comments;
      } catch (error) {
        throw new UserInputError('Unable to fetch comments', { error });
      }
    },
  },
  Mutation: {
    createComment: async (_: any, { comment }: any) => {
      try {
        // Implement logic to create a new comment in Cassandra using your driver
        const newComment = await createComment(comment);
        return newComment;
      } catch (error) {
        throw new UserInputError('Unable to create comment', { error });
      }
    },
    updateComment: async (_: any, { comment_id, comment }: any) => {
      try {
        // Implement logic to update a comment in Cassandra using your driver
        const updatedComment = await updateComment(comment_id, comment);
        return updatedComment;
      } catch (error) {
        throw new UserInputError('Unable to update comment', { error });
      }
    },
    deleteComment: async (_: any, { comment_id }: any) => {
      try {
        // Implement logic to delete a comment from Cassandra using your driver
        const deletedComment = await deleteComment(comment_id);
        return deletedComment;
      } catch (error) {
        throw new UserInputError('Unable to delete comment', { error });
      }
    },
  },
};

export default commentsResolvers;
