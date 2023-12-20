import api from '../config/api';

export const registerUserLocal = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response;
}

export const signInUserLocal = async (formData) => {
  const response = await api.post('/auth/signin', formData);
  return response;
}

export const requestReset = async (formData) => {
  const response = await api.post('/auth/request-reset', formData);
  return response;
}