import {cassandraClient} from "../client";

cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch((err) => console.error(`Cassandra connection error: ${err}`));

// Sample functions for performing CRUD operations on attachments
export const findOneAttachment = async (attachmentId: string) => {
  const query = 'SELECT * FROM attachments WHERE attachment_id = ?';
  const result = await cassandraClient.execute(query, [attachmentId], { prepare: true });
  return result.first();
};

export const findAllAttachments = async () => {
  const query = 'SELECT * FROM attachments';
  const result = await cassandraClient.execute(query);
  return result.rows;
};

export const createAttachment = async (attachment: any) => {
  const query = 'INSERT INTO attachments (attachment_id, task_id, file_name, file_data, created_at) VALUES (?, ?, ?, ?, ?)';
  const params = [attachment.attachment_id, attachment.task_id, attachment.file_name, attachment.file_data, attachment.created_at];
  await cassandraClient.execute(query, params, { prepare: true });
  return attachment;
};

export const updateAttachment = async (attachmentId: string, attachment: any) => {
  const query = 'UPDATE attachments SET task_id = ?, file_name = ?, file_data = ?, created_at = ? WHERE attachment_id = ?';
  const params = [attachment.task_id, attachment.file_name, attachment.file_data, attachment.created_at, attachmentId];
  await cassandraClient.execute(query, params, { prepare: true });
  return attachment;
};

export const deleteAttachment = async (attachmentId: string) => {
  const query = 'DELETE FROM attachments WHERE attachment_id = ?';
  await cassandraClient.execute(query, [attachmentId], { prepare: true });
};