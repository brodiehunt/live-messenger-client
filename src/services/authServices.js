import api from '../config/api';

export const registerUserLocal = async (formData) => {
    const response = await api.post('/auth/register', formData);
    console.log(response.data)
    return response.data;
}