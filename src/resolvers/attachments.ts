import { UserInputError } from 'apollo-server-express';
import * as Attachment from '../drivers/attachments'; // Import your Cassandra Attachment model

const attachmentResolvers = {
  Query: {
    getAttachment: async (_: any, { attachment_id }: any) => {
      try {
        // Implement logic to fetch an attachment by ID from Cassandra using your driver
        const attachment = await Attachment.findOneAttachment( attachment_id );
        if (!attachment) {
          throw new UserInputError('Attachment not found', { attachment_id });
        }
        return attachment;
      } catch (error) {
        throw new UserInputError('Unable to fetch attachment', { error });
      }
    },
    getAllAttachments: async () => {
      try {
        // Implement logic to fetch all attachments from Cassandra using your driver
        const attachments = await Attachment.findAllAttachments();
        return attachments;
      } catch (error) {
        throw new UserInputError('Unable to fetch attachments', { error });
      }
    },
  },
  Mutation: {
    createAttachment: async (_: any, { attachment }: any) => {
      try {
        // Implement logic to create a new attachment in Cassandra using your driver
        const newAttachment = await Attachment.createAttachment(attachment);
        return newAttachment;
      } catch (error) {
        throw new UserInputError('Unable to create attachment', { error });
      }
    },
    updateAttachment: async (_: any, { attachment_id, attachment }: any) => {
      try {
        // Implement logic to update an attachment in Cassandra using your driver
        await Attachment.updateAttachment(attachment,attachment_id );
        return Attachment.findOneAttachment(attachment_id);
      } catch (error) {
        throw new UserInputError('Unable to update attachment', { error });
      }
    },
    deleteAttachment: async (_: any, { attachment_id }: any) => {
      try {
        // Implement logic to delete an attachment from Cassandra using your driver
        const attachment = await Attachment.findOneAttachment(attachment_id);
        if (!attachment) {
          throw new UserInputError('Attachment not found', { attachment_id });
        }
        await Attachment.deleteAttachment(attachment_id);
        return attachment;
      } catch (error) {
        throw new UserInputError('Unable to delete attachment', { error });
      }
    },
  },
};

export default attachmentResolvers;
