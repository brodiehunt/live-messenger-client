import api from "../config/api";

export const createConversation = async (recipientIds) => {
  const response = await api.post("/conversation", recipientIds);
  return response;
};

export const getConversation = async (conversationId) => {
  const response = await api.get(`/conversation/${conversationId}`);
  return response.data.data;
};

export const getConversations = async () => {
  const response = await api.get("/conversation");
  return response.data.data;
};

export const sendMessage = async (conversationId, formData) => {
  const response = await api.post(
    `/conversation/${conversationId}/message`,
    formData
  );
  return response.data.data;
};

export const sendReadReciept = async (conversationId) => {
  const response = await api.put(`conversation/${conversationId}/read`);
  return response.data.data;
};
