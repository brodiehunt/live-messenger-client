import api from '../config/api';

export const updateName = async (formData) => {
  const response = await api.put('/account/name', formData)
  return response
  
}

export const updateUsername = async (formData) => {
  const response = await api.put('/account/username', formData)
  return response;

}

export const updateEmail = async (formData) => {
  const response = await api.put('/account/email', formData)
  return response
}

export const updateSettings = async (formData) => {
  const response = await api.put('/account/settings', formData)
  return response
}

export const getAccount = async () => {
  const response = await api.get('/account/');
  return response;
}