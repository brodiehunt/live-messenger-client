import api from '../config/api';

export const updateName = async (formData) => {
  const response = await api.put('/user/name', formData)
  return response
  
}

export const updateUsername = async (formData) => {
  const response = await api.put('/user/username', formData)
  return response;

}

export const updateEmail = async (formData) => {
  const response = await api.put('/user/email', formData)
  return response
}

export const updateSettings = async (formData) => {
  const response = await api.put('/user/settings', formData)
  return response
}

export const getAccount = async () => {
  const response = await api.get('/user/');
  return response;
}

export const findUsers = async (searchVal) => {
  const response = await api.get('/user/users', {searchVal});
  return response;
}