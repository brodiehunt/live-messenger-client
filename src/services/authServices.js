import api from '../config/api';

export const registerUserLocal = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response;
}

export const signInUserLocal = async (formData) => {
  const response = await api.post('/auth/signin', formData);
  return response;
}